'use client';

import { useATSAnalysis } from '@/hooks/useATSAnalysis';
import { useJDMatch } from '@/hooks/useJDMatch';

const AnalysisLayout = ({ children }) => {
    // Initialize analysis hooks at the layout level
    useATSAnalysis();
    useJDMatch();

    return (
        <div className="min-h-screen bg-[#0b1220]">
            {children}
        </div>
    );
};

export default AnalysisLayout;
