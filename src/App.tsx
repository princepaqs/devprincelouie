import { useRef, useState } from "react";

export default function App() {
  const noRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [accepted, setAccepted] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    if (!noRef.current || !containerRef.current) return;

    const moveDistance = 130;

    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle) * moveDistance;
    const dy = Math.sin(angle) * moveDistance;

    const button = noRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    setOffset(prev => {
      const nextX = prev.x + dx;
      const nextY = prev.y + dy;

      const isMobile = window.innerWidth < 768;

      if (!isMobile) {

        return { x: nextX, y: nextY };
      }


      const minX = container.left - button.left + prev.x;
      const maxX = container.right - button.right + prev.x;

      const minY = container.top - button.top + prev.y;
      const maxY = container.bottom - button.bottom + prev.y;

      return {
        x: Math.min(Math.max(nextX, minX), maxX),
        y: Math.min(Math.max(nextY, minY), maxY),
      };
    });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 px-4">
      {!accepted ? (
        <div
          ref={containerRef}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="mb-4 flex flex-col items-center">
            <img src="/bear.gif" alt="bear gif" className="w-40 h-40 mb-2" />
            <h1 className="text-3xl font-bold text-pink-600">
              Will you be my Valentine?
            </h1>
          </div>

          <div className="relative flex justify-center gap-6">
            <button
              onClick={() => setAccepted(true)}
              className="cursor-pointer px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
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
              className="cursor-pointer px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-semibold
                         transition-transform duration-300 ease-out"
            >
              No 💔
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <img
            src="/happy-valentines.gif"
            alt="happy-valentines gif"
            className="w-40 h-40 mx-auto mb-2"
          />
          <h2 className="text-4xl font-bold text-pink-600">Yay!!! 💞</h2>
        </div>
      )}
    </div>
  );
}
