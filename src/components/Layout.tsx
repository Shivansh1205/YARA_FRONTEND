import { YaraLogo } from './YaraLogo';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
            {/* Techy Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Glow Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/10 rounded-full blur-[120px]" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,#020617_100%] opacity-80" />
            </div>

            {/* YARA Header - Fixed at top */}
            <div className="relative z-20 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-3 max-w-7xl">
                    <div className="flex items-center space-x-3">
                        <YaraLogo size={36} />
                        <div>
                            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                YARA
                            </h1>
                            <p className="text-[10px] text-slate-500 tracking-wider">Your AI Relationship Advisor</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-6 h-screen flex flex-col max-w-7xl">
                {children}
            </div>
        </div>
    );
};
