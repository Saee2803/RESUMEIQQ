'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaChartBar, FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

/* Core */
import Editor from '../../components/Editor';
import Preview from '../../components/Resume/Preview';

/* UI */
import Tabs from '@/components/Tabs';

/* Store */
import { resetResume, saveResume } from '@/store/slices/resumeSlice';

/* Hooks */
import { useATSAnalysis } from '../../hooks/useATSAnalysis';

const EditorPage = ({ searchParams }) => {
    const tab = searchParams?.tab || 'contact';
    const dispatch = useDispatch();
    const saved = useSelector(state => state.resume.saved);
    
    const [mounted, setMounted] = useState(false);
    const [saveState, setSaveState] = useState('idle'); // 'idle' | 'saving' | 'success' | 'error'
    const [resetConfirm, setResetConfirm] = useState(false);

    // Prevent hydration mismatch by waiting for client mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize ATS analysis for real-time score updates
    useATSAnalysis();

    const handleSave = useCallback(async () => {
        if (saveState === 'saving') return;
        
        setSaveState('saving');
        
        try {
            // Simulate save delay for UX feedback
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(saveResume());
            setSaveState('success');
            
            // Reset to idle after showing success
            setTimeout(() => setSaveState('idle'), 2000);
        } catch (error) {
            console.error('Save failed:', error);
            setSaveState('error');
            setTimeout(() => setSaveState('idle'), 3000);
        }
    }, [dispatch, saveState]);

    const handleReset = useCallback(() => {
        if (resetConfirm) {
            dispatch(resetResume());
            setResetConfirm(false);
            setSaveState('idle');
        } else {
            setResetConfirm(true);
            // Auto-cancel after 3 seconds
            setTimeout(() => setResetConfirm(false), 3000);
        }
    }, [dispatch, resetConfirm]);

    const getSaveButtonContent = () => {
        switch (saveState) {
            case 'saving':
                return (
                    <>
                        <CgSpinner className="animate-spin" />
                        <span>Saving...</span>
                    </>
                );
            case 'success':
                return (
                    <>
                        <span className="text-green-400">✓</span>
                        <span>Saved!</span>
                    </>
                );
            case 'error':
                return (
                    <>
                        <span className="text-red-400">✗</span>
                        <span>Failed</span>
                    </>
                );
            default:
                return (
                    <>
                        <FaSave />
                        <span>Save</span>
                    </>
                );
        }
    };

    // Prevent hydration mismatch - show loading until client is ready
    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#0b1220] flex items-center justify-center">
                <CgSpinner className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b1220]">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
            </div>

            <div className="relative mx-auto max-w-screen-2xl px-4 md:px-6 py-6">

                {/* GRID - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-6 lg:gap-8">

                    {/* ================= LEFT : EDITOR ================= */}
                    <div className="space-y-5">

                        {/* HEADER */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Resume Editor
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Fill in your details to build your resume</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Unsaved indicator */}
                                {!saved && saveState === 'idle' && (
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                        <span className="text-xs text-amber-400">Unsaved</span>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handleReset}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        resetConfirm 
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                                >
                                    {resetConfirm ? 'Confirm Reset' : 'Reset'}
                                </button>
                                
                                <button 
                                    onClick={handleSave}
                                    disabled={saveState === 'saving'}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 min-w-[130px] justify-center ${
                                        saveState === 'success' 
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                                            : saveState === 'error'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                                    }`}
                                >
                                    {getSaveButtonContent()}
                                </button>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="overflow-x-auto pb-2 -mx-4 px-4">
                            <Tabs activeTab={tab} />
                        </div>

                        {/* EDITOR CARD */}
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8">
                            <Editor tab={tab} onSave={handleSave} saveState={saveState} />
                        </div>

                        {/* Quick Analysis Link */}
                        <div className="flex justify-center pt-4">
                            <Link
                                href="/analysis"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-gray-400 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 hover:text-white transition-all"
                            >
                                <FaChartBar className="text-blue-400" />
                                <span>Analyze ATS Score & JD Match</span>
                            </Link>
                        </div>
                    </div>

                    {/* ================= RIGHT : PREVIEW ================= */}
                    <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
                        <Preview />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
