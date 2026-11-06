import { useMemo } from 'react';

const bubbleConfigs = [
  { w: 80, h: 50, top: '10%', left: '5%', delay: '0s', dur: '20s', bg: 'rgba(140, 207, 255, 0.04)', blur: 20 },
  { w: 120, h: 70, top: '60%', left: '80%', delay: '3s', dur: '25s', bg: 'rgba(139, 92, 246, 0.04)', blur: 25 },
  { w: 90, h: 55, top: '30%', left: '70%', delay: '7s', dur: '22s', bg: 'rgba(140, 207, 255, 0.03)', blur: 18 },
  { w: 110, h: 65, top: '75%', left: '15%', delay: '5s', dur: '28s', bg: 'rgba(139, 92, 246, 0.03)', blur: 22 },
  { w: 70, h: 45, top: '20%', left: '45%', delay: '10s', dur: '24s', bg: 'rgba(140, 207, 255, 0.035)', blur: 15 },
  { w: 100, h: 60, top: '50%', left: '25%', delay: '2s', dur: '26s', bg: 'rgba(139, 92, 246, 0.035)', blur: 20 },
  { w: 60, h: 40, top: '85%', left: '60%', delay: '8s', dur: '21s', bg: 'rgba(140, 207, 255, 0.03)', blur: 16 },
  { w: 130, h: 75, top: '5%', left: '85%', delay: '4s', dur: '30s', bg: 'rgba(139, 92, 246, 0.025)', blur: 28 },
];

export default function FloatingBubbles() {
  const bubbles = useMemo(() => bubbleConfigs, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(15px) rotate(2deg); }
          50% { transform: translateY(-15px) translateX(-10px) rotate(-1deg); }
          75% { transform: translateY(-40px) translateX(20px) rotate(1deg); }
        }
      `}</style>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.w,
            height: b.h,
            top: b.top,
            left: b.left,
            background: b.bg,
            borderRadius: '20px',
            filter: `blur(${b.blur}px)`,
            animation: `float-bubble ${b.dur} ease-in-out ${b.delay} infinite`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}
