'use client';

import ResumeFields from '@/config/ResumeFields';
import { saveResume } from '@/store/slices/resumeSlice';
import { useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaSave } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import MultiEditor from './MultiEditor';
import SingleEditor from './SingleEditor';

const Editor = ({ tab, onSave, saveState }) => {
    const { multiple } = ResumeFields[tab];
    const dispatch = useDispatch();
    const [localSaving, setLocalSaving] = useState(false);

    // Use parent's save handler if provided, otherwise use local
    const handleSave = useCallback(async (e) => {
        e?.preventDefault();
        
        if (onSave) {
            onSave();
        } else {
            setLocalSaving(true);
            await new Promise(resolve => setTimeout(resolve, 400));
            dispatch(saveResume());
            setLocalSaving(false);
        }
    }, [dispatch, onSave]);

    // Auto-save every 30 seconds (increased from 10s for better UX)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(saveResume());
        }, 30000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const currentSaveState = saveState || (localSaving ? 'saving' : 'idle');

    const getButtonContent = () => {
        switch (currentSaveState) {
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
                        <span>Error</span>
                    </>
                );
            default:
                return (
                    <>
                        <FaSave />
                        <span>Save Changes</span>
                    </>
                );
        }
    };

    const getButtonClass = () => {
        const base = 'btn gap-2 min-w-[130px]';
        switch (currentSaveState) {
            case 'success':
                return `${base} btn-success`;
            case 'error':
                return `${base} bg-red-600 border-red-600 text-white`;
            default:
                return `${base} btn-filled`;
        }
    };

    return (
        <>
            {/* ✅ TOP SAVE BAR */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleSave}
                    disabled={currentSaveState === 'saving'}
                    className={getButtonClass()}
                >
                    {getButtonContent()}
                </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSave} className="card-lg space-y-6">
                {multiple && <MultiEditor tab={tab} />}
                {!multiple && <SingleEditor tab={tab} />}
            </form>
        </>
    );
};

export default Editor;
