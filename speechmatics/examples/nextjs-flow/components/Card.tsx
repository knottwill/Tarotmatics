'use client';
const Card = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading?: string;
}) => {
  return (
    <div className="card bg-gray-800/50 backdrop-blur-sm shadow-lg card-bordered h-full border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
      {heading && (
        <div className="bg-gray-900/50 p-5 border-b border-purple-500/20">
          <h3 className="card-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{heading}</h3>
        </div>
      )}
      <div className="card-body text-gray-200">{children}</div>
    </div>
  );
};

export default Card;
