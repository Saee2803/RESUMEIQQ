'use client';

import Link from 'next/link';
import { FaArrowRight, FaChartBar, FaCheckCircle, FaFileAlt, FaRobot } from 'react-icons/fa';

const AnalysisPage = () => {
    return (
        <div className="relative min-h-[calc(100vh-80px)]">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-20 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
                        <FaRobot />
                        <span>AI-Powered Analysis</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Resume <span className="text-gradient">Analysis</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Analyze your resume's ATS compatibility and match it against job descriptions
                        to maximize your chances of getting shortlisted.
                    </p>
                </div>

                {/* Analysis Options */}
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    
                    {/* ATS Analysis Card */}
                    <Link
                        href="/analysis/ats"
                        className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative flex flex-col space-y-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <FaChartBar className="text-xl text-white" />
                            </div>
                            
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">ATS Score Analysis</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Get a detailed breakdown of your resume's ATS compatibility score
                                    with actionable suggestions to improve.
                                </p>
                            </div>

                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-blue-400" />
                                    <span>Overall compatibility score</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-blue-400" />
                                    <span>Section-by-section analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-blue-400" />
                                    <span>Improvement suggestions</span>
                                </li>
                            </ul>
                            
                            <div className="flex items-center gap-2 text-blue-400 font-semibold pt-2 group-hover:gap-3 transition-all">
                                <span>Analyze Now</span>
                                <FaArrowRight className="text-sm" />
                            </div>
                        </div>
                    </Link>

                    {/* JD Match Card */}
                    <Link
                        href="/analysis/jd"
                        className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-green-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative flex flex-col space-y-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                                <FaFileAlt className="text-xl text-white" />
                            </div>
                            
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Job Description Match</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Compare your resume against any job description to find missing
                                    keywords and optimize your application.
                                </p>
                            </div>

                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-400" />
                                    <span>Keyword matching analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-400" />
                                    <span>Missing skills detection</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-400" />
                                    <span>Tailored recommendations</span>
                                </li>
                            </ul>
                            
                            <div className="flex items-center gap-2 text-green-400 font-semibold pt-2 group-hover:gap-3 transition-all">
                                <span>Match JD</span>
                                <FaArrowRight className="text-sm" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Back to Editor */}
                <div className="text-center pt-8">
                    <Link
                        href="/editor"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        <span>←</span>
                        <span>Back to Resume Editor</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AnalysisPage;
