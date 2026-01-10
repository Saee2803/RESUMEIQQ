'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import RenderModeToggle from '../RenderModeToggle';
import Resume from './pdf';

import { usePDF } from '@react-pdf/renderer';
import { FaCheck, FaDownload, FaEye } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// Fixed height loader to prevent layout shift
const Loader = () => (
    <div className="flex h-[500px] w-full items-center justify-center bg-gray-100 rounded-lg">
        <CgSpinner className="mx-auto animate-spin text-4xl text-[#3b82f6]" />
    </div>
);

const preview = url => {
    window.open(
        url,
        'Resume Preview',
        `toolbar=no, location=no, menubar=no, scrollbars=yes, status=no, titlebar=no, resizable=yes, width=650, height=900, left=${window.innerWidth / 2 - 325}, top=50`,
    );
};

const Preview = () => {
    const containerRef = useRef(null);
    const debounceRef = useRef(null);
    const resumeData = useSelector(state => state.resume);
    const renderMode = useSelector(state => state.renderMode?.mode || 'RECRUITER');
    
    // Track container width for responsive PDF rendering
    const [containerWidth, setContainerWidth] = useState(400);
    
    // Memoize the document WITH mode to trigger re-render on mode change
    const resumeDocument = useMemo(
        () => <Resume data={resumeData} mode={renderMode} />, 
        [resumeData, renderMode]
    );
    const [instance, updateInstance] = usePDF({ document: resumeDocument });
    const [downloadState, setDownloadState] = useState('idle');
    const [isUpdating, setIsUpdating] = useState(false);

    // Measure container width for responsive PDF sizing
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                // Get available width minus padding
                const width = containerRef.current.clientWidth - 32; // 16px padding on each side
                setContainerWidth(Math.max(300, Math.min(width, 595))); // Clamp between 300-595
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Debounced update function for live preview
    const debouncedUpdate = useCallback(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        
        setIsUpdating(true);
        debounceRef.current = setTimeout(() => {
            updateInstance(<Resume data={resumeData} mode={renderMode} />);
            setIsUpdating(false);
        }, 300); // 300ms debounce for smooth typing
    }, [resumeData, renderMode, updateInstance]);

    // Update preview on ANY resume data change (live updates)
    useEffect(() => {
        debouncedUpdate();
        
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [resumeData, debouncedUpdate]);

    // IMMEDIATE update on render mode change (no debounce for mode switch)
    useEffect(() => {
        setIsUpdating(true);
        updateInstance(<Resume data={resumeData} mode={renderMode} />);
        // Small delay to show the updating state
        setTimeout(() => setIsUpdating(false), 200);
    }, [renderMode]);

    const handleDownload = () => {
        setDownloadState('downloading');
        // Simulate download preparation
        setTimeout(() => {
            setDownloadState('success');
            setTimeout(() => setDownloadState('idle'), 2000);
        }, 500);
    };

    const getDownloadButtonContent = () => {
        switch (downloadState) {
            case 'downloading':
                return (
                    <>
                        <CgSpinner className="animate-spin text-base" />
                        <span>Preparing...</span>
                    </>
                );
            case 'success':
                return (
                    <>
                        <FaCheck className="text-base" />
                        <span>Downloaded!</span>
                    </>
                );
            default:
                return (
                    <>
                        <FaDownload className="text-base" />
                        <span>Download PDF</span>
                    </>
                );
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Resume Mode Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-semibold text-white">Resume Mode</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Choose format style</p>
                    </div>
                    {isUpdating && (
                        <span className="text-xs text-blue-400 flex items-center gap-1.5 bg-blue-500/10 px-2.5 py-1 rounded-full">
                            <CgSpinner className="animate-spin text-xs" />
                            Updating...
                        </span>
                    )}
                </div>
                
                <RenderModeToggle />
                
                {/* Mode description */}
                <div className={`mt-4 text-xs px-4 py-3 rounded-xl transition-all duration-300 ${
                    renderMode === 'ATS' 
                        ? 'bg-blue-500/5 border border-blue-500/20' 
                        : 'bg-green-500/5 border border-green-500/20'
                }`}>
                    {renderMode === 'ATS' ? (
                        <p className="text-gray-400">
                            <span className="text-blue-400 font-medium">ATS Mode:</span> Plain format optimized for Applicant Tracking Systems
                        </p>
                    ) : (
                        <p className="text-gray-400">
                            <span className="text-green-400 font-medium">Recruiter Mode:</span> Professional layout with rich formatting
                        </p>
                    )}
                </div>
            </div>

            {/* PDF Preview Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">Live Preview</h3>
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                        renderMode === 'ATS' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-green-500/20 text-green-300'
                    }`}>
                        {renderMode === 'ATS' ? '🤖 ATS' : '👔 Recruiter'}
                    </span>
                </div>
                
                {/* PDF Preview Container */}
                <div 
                    ref={containerRef}
                    className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 p-3"
                >
                    {/* Paper shadow effect */}
                    <div className="relative bg-white rounded-lg shadow-2xl shadow-black/40 overflow-hidden">
                        {instance.loading ? (
                            <Loader />
                        ) : (
                            <Document 
                                loading={<Loader />} 
                                file={instance.url}
                                className="flex justify-center"
                            >
                                <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    loading={<Loader />}
                                    width={containerWidth}
                                />
                            </Document>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                {!instance.loading && (
                    <div className="mt-4 flex gap-3">
                        <button 
                            onClick={() => preview(instance.url)} 
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <FaEye />
                            <span>Preview</span>
                        </button>
                        <a
                            href={instance.url}
                            download={`${resumeData.contact?.name || 'resume'}_${renderMode.toLowerCase()}.pdf`}
                            onClick={handleDownload}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                downloadState === 'success' 
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                            }`}
                        >
                            {getDownloadButtonContent()}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preview;
