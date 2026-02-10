import { useRef, useState } from "react";

export default function App() {
  const noRef = useRef<HTMLButtonElement>(null);
  const [accepted, setAccepted] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    if (!noRef.current) return;

    const moveDistance = 120; // how far it moves per dodge

    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * moveDistance;
    const y = Math.sin(angle) * moveDistance;

    setOffset(prev => ({
      x: prev.x + x,
      y: prev.y + y,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 px-4">
      {!accepted ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4 flex flex-col items-center">
            <img
              src="/bear.gif"
              alt="bear gif"
              className="w-40 h-40 mb-2"
            />
            <h1 className="text-3xl font-bold text-pink-600">
              Will you be my Valentine?
            </h1>
          </div>

          <div className="relative flex justify-center gap-6">
            <button
              onClick={() => setAccepted(true)}
              className="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            >
              Yes 💘
            </button>

            <button
              ref={noRef}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
              className="px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-semibold
                         transition-transform duration-300 ease-out"
            >
              No 💔
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="mb-4 flex flex-col items-center">
            <img
              src="/happy-valentines.gif"
              alt="happy-valentines gif"
              className="w-40 h-40 mb-2"
            />
            <h2 className="text-4xl font-bold text-pink-600 mb-4">
              Yay!!! 💞
            </h2>
          </div>

        </div>
      )}
    </div>
  );
}
