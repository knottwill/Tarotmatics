export default function Home() {
  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="text-center space-y-4 relative z-10">
        <h1 className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient">
          Tarotmatics
        </h1>
        <p className="text-gray-300 text-lg font-light tracking-wider">Please choose your connection method to the Ether</p>
      </div>

      <nav className="grid grid-cols-2 gap-6 relative z-10">
        <a 
          href="/websocket" 
          className="group px-8 py-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50 text-center text-lg font-medium shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm relative overflow-hidden"
        >
          <span className="relative z-10">Websocket</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </a>
        <a 
          href="/livekit" 
          className="group px-8 py-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50 text-center text-lg font-medium shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm relative overflow-hidden"
        >
          <span className="relative z-10">Livekit</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </a>
      </nav>

      <div className="absolute bottom-4 text-gray-500 text-sm font-light tracking-wider relative z-10">
        <span className="opacity-70">Powered by</span> <span className="text-purple-400">Speechmatics</span>
      </div>
    </div>
  );
}
