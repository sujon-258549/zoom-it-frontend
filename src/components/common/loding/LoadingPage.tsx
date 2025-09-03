const LoadingPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950 dark:to-blue-900 p-4">
            <div className="text-center p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg md:shadow-xl w-full max-w-md mx-auto border border-cyan-100 dark:border-cyan-800">
                {/* Responsive animated logo/icon */}
                <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
                    <div className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-spin"></div>
                    <div className="absolute inset-6 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <svg className="w-4 h-4 md:w-8 md:h-8 text-cyan-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Responsive text with cyan gradient */}
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                    Loading Your Experience
                </h2>
                
                {/* Responsive subtitle */}
                <p className="text-cyan-700 dark:text-cyan-300 mt-2 md:mt-3 mb-4 md:mb-6 text-sm md:text-base">
                    Preparing something amazing just for you
                </p>

                {/* Responsive progress indicator */}
                <div className="w-48 h-1.5 md:w-64 md:h-2 bg-cyan-100 dark:bg-cyan-900 rounded-full overflow-hidden mx-auto mb-4 md:mb-6">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-progress"></div>
                </div>

                {/* Responsive floating elements */}
                <div className="flex justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>

                {/* Responsive subtle counter */}
                <div className="text-xs text-cyan-600 dark:text-cyan-400">
                    <span className="font-mono">Loading assets</span>
                    <span className="animate-pulse">...</span>
                </div>
            </div>

            <style>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    50% { width: 70%; }
                    100% { width: 100%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                .animate-progress {
                    animation: progress 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;