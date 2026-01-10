"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartBar, FaEdit, FaHome } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Header = () => {
    const pathname = usePathname();
    const isEditorPage = pathname.startsWith("/editor");
    const isAnalysisPage = pathname.startsWith("/analysis");
    const isHomePage = pathname === "/";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1220]/80 border-b border-white/[0.05]">
            <div className="mx-auto max-w-screen-2xl px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                                <HiSparkles className="text-white text-xl" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">ResumeIQ</h1>
                            <p className="text-[10px] text-gray-500 -mt-0.5 hidden sm:block">
                                {isEditorPage && "Resume Editor"}
                                {isAnalysisPage && "Resume Analysis"}
                                {isHomePage && "AI Resume Builder"}
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-2">
                        {!isHomePage && (
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <FaHome className="text-base" />
                                <span className="hidden sm:inline">Home</span>
                            </Link>
                        )}

                        {!isEditorPage && (
                            <Link
                                href="/editor"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isHomePage 
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <FaEdit className="text-base" />
                                <span className="hidden sm:inline">{isHomePage ? 'Get Started' : 'Editor'}</span>
                            </Link>
                        )}

                        {!isAnalysisPage && (
                            <Link
                                href="/analysis"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <FaChartBar className="text-base" />
                                <span className="hidden sm:inline">Analysis</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
