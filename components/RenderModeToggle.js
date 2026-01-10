'use client';

import { selectRenderMode, setRenderMode } from '@/store/slices/renderModeSlice';
import { useDispatch, useSelector } from 'react-redux';

const RenderModeToggle = () => {
    const dispatch = useDispatch();
    const mode = useSelector(selectRenderMode);

    const handleModeChange = (newMode) => {
        dispatch(setRenderMode(newMode));
    };

    return (
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
            {/* ATS Mode Button */}
            <button
                onClick={() => handleModeChange('ATS')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === 'ATS'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={mode === 'ATS'}
            >
                <span>🤖</span>
                <span>ATS</span>
            </button>

            {/* Recruiter Mode Button */}
            <button
                onClick={() => handleModeChange('RECRUITER')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === 'RECRUITER'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={mode === 'RECRUITER'}
            >
                <span>👔</span>
                <span>Recruiter</span>
            </button>
        </div>
    );
};

export default RenderModeToggle;
