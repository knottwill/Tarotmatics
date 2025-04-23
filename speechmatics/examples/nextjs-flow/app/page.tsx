export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      
      {/* Floating Mystical Symbols */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-white/10 text-4xl animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {randomMysticSymbol()}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12 text-center max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-bold tracking-wider bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 text-transparent bg-clip-text animate-gradient">
          Tarotmatics
        </h1>
        <p className="mt-4 text-gray-300 text-xl tracking-wide font-light">
          Where the cards speak and the AI listens
        </p>
        <div className="mt-8">
          <a
            href="/livekit"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform shadow-lg font-medium text-lg"
          >
            Enter the Ether
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Powered by <span className="text-purple-400">Speechmatics</span>
        </div>
      </div>
    </div>
  );
}

// Utility for random mystical symbols (Unicode & pseudo-Glyphs)
function randomMysticSymbol() {
  const symbols = ['☽', '☾', '✶', '✦', '☿', '⚚', '♃', '♄', '⛧', '☥', 'ᛉ', '𓂀'];
  return symbols[Math.floor(Math.random() * symbols.length)];
}
