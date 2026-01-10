'use client';

import Link from 'next/link';
import { FaArrowRight, FaBolt, FaChartBar, FaCheck, FaDownload, FaFileAlt, FaRobot, FaShieldAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { IoIosRocket } from 'react-icons/io';
import ImgTilt from './ImgTilt';

/* ========== FEATURES DATA ========== */
const features = [
    {
        icon: FaRobot,
        title: 'ATS-Optimized',
        description: 'Formatting that passes automated screening systems with 95%+ success rate',
        color: 'blue',
    },
    {
        icon: FaChartBar,
        title: 'Real-time Analysis',
        description: 'Get instant feedback on your resume score and improvement suggestions',
        color: 'purple',
    },
    {
        icon: FaFileAlt,
        title: 'JD Matching',
        description: 'Match your resume keywords with any job description for better alignment',
        color: 'green',
    },
    {
        icon: FaDownload,
        title: 'PDF Export',
        description: 'Download professional, print-ready PDFs optimized for any application',
        color: 'orange',
    },
];

/* ========== HOW IT WORKS ========== */
const steps = [
    {
        number: '01',
        title: 'Enter Your Details',
        description: 'Fill in your experience, education, and skills using our intuitive editor',
    },
    {
        number: '02',
        title: 'Choose Your Mode',
        description: 'Switch between ATS-optimized or Recruiter-friendly formats instantly',
    },
    {
        number: '03',
        title: 'Download & Apply',
        description: 'Export your polished resume and start landing more interviews',
    },
];

const HomePage = () => {
    return (
        <div className="relative overflow-hidden">
            {/* ========== BACKGROUND EFFECTS ========== */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
                <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-[100px]" />
                
                {/* Grid pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '64px 64px'
                    }}
                />
            </div>

            {/* ========== HERO SECTION ========== */}
            <section className="relative mx-auto max-w-screen-xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    
                    {/* LEFT CONTENT */}
                    <div className="max-w-2xl text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6 animate-fade-in">
                            <HiSparkles className="text-yellow-400" />
                            <span>AI-Powered Resume Builder</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                            <span className="text-white">Build Resumes That</span>
                            <br />
                            <span className="text-gradient">Beat the ATS</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Create ATS-optimized, recruiter-approved resumes in minutes. 
                            Get real-time scoring and job description matching to land more interviews.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link
                                href="/editor"
                                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                <span>Create My Resume</span>
                                <IoIosRocket className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            <Link
                                href="/analysis"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <FaChartBar className="text-blue-400" />
                                <span>Check ATS Score</span>
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Free to use
                            </span>
                            <span className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                No signup required
                            </span>
                            <span className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Instant PDF export
                            </span>
                        </div>
                    </div>

                    {/* RIGHT - RESUME PREVIEW */}
                    <div className="relative flex-shrink-0">
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl scale-110" />
                        
                        <ImgTilt>
                            <div className="relative">
                                <img
                                    src="/sample.png"
                                    alt="ResumeIQ Resume Preview"
                                    className="relative rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
                                />
                                
                                {/* Floating ATS Score Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl shadow-green-500/20 flex items-center gap-3 animate-float">
                                    <div className="text-3xl font-bold text-white">85+</div>
                                    <div className="text-xs text-green-100 leading-tight">
                                        ATS<br/>Score
                                    </div>
                                </div>

                                {/* Floating Feature Badge */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500/90 to-indigo-600/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl shadow-blue-500/20 flex items-center gap-2 animate-float-delayed">
                                    <FaBolt className="text-yellow-300" />
                                    <span className="text-sm font-medium text-white">Live Preview</span>
                                </div>
                            </div>
                        </ImgTilt>
                    </div>
                </div>
            </section>

            {/* ========== FEATURES SECTION ========== */}
            <section className="relative py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
                <div className="mx-auto max-w-screen-xl px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Everything You Need to
                            <span className="text-gradient"> Land the Interview</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            Built with the latest ATS requirements in mind, ResumeIQ gives you the edge in today's competitive job market
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                                    feature.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                    feature.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                                    feature.color === 'green' ? 'bg-green-500/10 text-green-400' :
                                    'bg-orange-500/10 text-orange-400'
                                }`}>
                                    <feature.icon className="text-2xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="relative py-24">
                <div className="mx-auto max-w-screen-xl px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Create Your Resume in
                            <span className="text-gradient"> 3 Simple Steps</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connection line */}
                        <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-green-500/50" />
                        
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative text-center">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg mb-6 shadow-lg shadow-blue-500/25">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <Link
                            href="/editor"
                            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            <span>Start Building Now</span>
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== WHY RESUMEIQ ========== */}
            <section className="relative py-24 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
                <div className="mx-auto max-w-screen-xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Why Choose
                                <span className="text-gradient"> ResumeIQ?</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Most resumes fail ATS screening before a human ever sees them. 
                                ResumeIQ ensures your resume is optimized for both machines and humans.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: FaShieldAlt, text: 'Built specifically for ATS compatibility' },
                                    { icon: FaBolt, text: 'Real-time preview with instant feedback' },
                                    { icon: FaRobot, text: 'AI-powered keyword optimization' },
                                    { icon: FaFileAlt, text: 'Professional templates that recruiters love' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                                        <div className="p-2 rounded-lg bg-blue-500/10">
                                            <item.icon className="text-xl text-blue-400" />
                                        </div>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
                            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm font-medium text-gray-400">ATS Compatibility Score</span>
                                    <span className="text-2xl font-bold text-green-400">92%</span>
                                </div>
                                
                                {/* Score breakdown */}
                                <div className="space-y-4">
                                    {[
                                        { label: 'Format & Structure', score: 95, color: 'green' },
                                        { label: 'Keyword Match', score: 88, color: 'blue' },
                                        { label: 'Content Quality', score: 90, color: 'purple' },
                                        { label: 'Readability', score: 94, color: 'emerald' },
                                    ].map((item, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">{item.label}</span>
                                                <span className="text-white font-medium">{item.score}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        item.color === 'green' ? 'bg-green-500' :
                                                        item.color === 'blue' ? 'bg-blue-500' :
                                                        item.color === 'purple' ? 'bg-purple-500' :
                                                        'bg-emerald-500'
                                                    }`}
                                                    style={{ width: `${item.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="relative py-16 border-t border-white/5">
                <div className="mx-auto max-w-screen-xl px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gradient">ResumeIQ</h3>
                            <p className="mt-2 text-sm text-gray-500">Build ATS-optimized resumes that get you hired.</p>
                        </div>

                        <div className="flex items-center gap-8 text-sm text-gray-500">
                            <Link href="/editor" className="hover:text-white transition-colors">Editor</Link>
                            <Link href="/analysis" className="hover:text-white transition-colors">Analysis</Link>
                            <Link href="/analysis/ats" className="hover:text-white transition-colors">ATS Score</Link>
                            <Link href="/analysis/jd" className="hover:text-white transition-colors">JD Match</Link>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} ResumeIQ. Built for job seekers who want results.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
