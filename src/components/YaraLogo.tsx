interface YaraLogoProps {
    size?: number;
    className?: string;
}

export const YaraLogo = ({ size = 40, className = '' }: YaraLogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Gradient definitions */}
            <defs>
                <linearGradient id="yaraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FF9A9E', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#A18CD1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#7B68EE', stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            {/* Main circle with gradient */}
            <circle cx="200" cy="200" r="180" fill="url(#yaraGradient)" />

            {/* Chat bubble tail */}
            <path
                d="M 90 300 Q 70 320 75 340 L 90 320 Z"
                fill="url(#yaraGradient)"
            />

            {/* Sparkles/Stars */}
            {/* Large center star */}
            <path
                d="M 260 200 L 270 220 L 290 230 L 270 240 L 260 260 L 250 240 L 230 230 L 250 220 Z"
                fill="white"
                opacity="0.95"
            />

            {/* Top left star */}
            <path
                d="M 160 110 L 165 120 L 175 125 L 165 130 L 160 140 L 155 130 L 145 125 L 155 120 Z"
                fill="white"
                opacity="0.9"
            />

            {/* Top right star */}
            <path
                d="M 310 95 L 318 110 L 333 118 L 318 126 L 310 141 L 302 126 L 287 118 L 302 110 Z"
                fill="white"
                opacity="0.95"
            />

            {/* Small accent stars */}
            <circle cx="180" cy="180" r="4" fill="white" opacity="0.8" />
            <circle cx="290" cy="170" r="3" fill="white" opacity="0.7" />
        </svg>
    );
};

