export default function Home() {
  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Speechmatics Flow
        </h1>
        <p className="text-gray-300 text-lg">Choose your connection method</p>
      </div>
      <nav className="grid grid-cols-2 gap-6">
        <a 
          href="/websocket" 
          className="px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50 text-center text-lg font-medium shadow-lg hover:shadow-purple-500/20"
        >
          Websocket
        </a>
        <a 
          href="/livekit" 
          className="px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50 text-center text-lg font-medium shadow-lg hover:shadow-purple-500/20"
        >
          Livekit
        </a>
      </nav>
      <div className="absolute bottom-4 text-gray-500 text-sm">
        Powered by Speechmatics
      </div>
    </div>
  );
}
