import ResumeFields from '@/config/ResumeFields';
import Link from 'next/link';

const Tabs = ({ activeTab }) => {
    const tabs = Object.keys(ResumeFields);

    return (
        <div className="flex w-full gap-1.5 overflow-x-auto pb-1">
            {tabs.map(tab => (
                <Link
                    key={tab}
                    className={`relative cursor-pointer rounded-xl px-4 py-2 text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                    }`}
                    href={`/editor/?tab=${tab}`}
                >
                    {tab}
                </Link>
            ))}
        </div>
    );
};

export default Tabs;
