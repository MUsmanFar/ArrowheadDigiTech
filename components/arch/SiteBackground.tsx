'use client';

/**
 * SiteBackground — fixed full-viewport living atmosphere.
 *
 * Layer 1: Noise texture (opacity 0.03, multiply blend) — premium paper feel
 * Layer 2: Neural network SVG (pure CSS animated, zero JS) — flowing energy lines
 * Layer 3: Four animated ambient orbs — warm + cool color temperature
 * Layer 4: Fine dot grid drifting slowly — architectural depth
 *
 * Zero JS, zero canvas, zero requestAnimationFrame.
 * All CSS animations with will-change:transform — GPU-composited at 60fps.
 * prefers-reduced-motion: all animations disabled cleanly.
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'linear-gradient(165deg,#fdfcfb 0%,#fafaf9 50%,#f8f7f5 100%)' }}
    >
      {/* ══ 1. Noise texture ══════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.032] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ══ 2. Neural network SVG ══════════════════════════════════
          9 nodes connected by glowing lines. Pure SVG — no script.
          Each node pulses; each line has a travelling-light dash.
      ══════════════════════════════════════════════════════════════ */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.055]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for nodes */}
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Glow for lines */}
          <filter id="line-glow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Connection lines ── */}
        {/* Node positions: A(120,180) B(380,80) C(680,200) D(920,100) E(1240,220)
                           F(200,500) G(560,420) H(860,540) I(1180,480) J(1380,620) */}
        {[
          // [x1,y1,x2,y2, strokeColor, dashLen, dur, delay]
          [120,180, 380,80,  '#e46f1e', 60, '8s',  '0s'],
          [380,80,  680,200, '#2b6ef2', 80, '10s', '1s'],
          [680,200, 920,100, '#e46f1e', 55, '9s',  '2s'],
          [920,100, 1240,220,'#2b6ef2', 70, '11s', '0.5s'],
          [120,180, 200,500, '#7c3aed', 65, '12s', '3s'],
          [380,80,  560,420, '#059669', 75, '9s',  '1.5s'],
          [680,200, 560,420, '#e46f1e', 50, '8s',  '4s'],
          [680,200, 860,540, '#2b6ef2', 85, '13s', '2.5s'],
          [920,100, 860,540, '#7c3aed', 60, '10s', '0.8s'],
          [1240,220,1380,620,'#e46f1e', 70, '11s', '3.5s'],
          [1240,220,1180,480,'#2b6ef2', 55, '9s',  '1.2s'],
          [560,420, 860,540, '#059669', 80, '12s', '0s'],
          [860,540, 1180,480,'#e46f1e', 65, '10s', '2s'],
          [1180,480,1380,620,'#2b6ef2', 75, '8s',  '4.5s'],
          [200,500, 560,420, '#e46f1e', 60, '11s', '1.8s'],
        ].map(([x1,y1,x2,y2,color,dash,dur,delay], i) => {
          const len = Math.hypot((x2 as number)-(x1 as number),(y2 as number)-(y1 as number));
          return (
            <line key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color as string} strokeWidth="1"
              strokeDasharray={`${dash} ${len}`}
              filter="url(#line-glow)"
              strokeOpacity="0.7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from={String(len)} to="0"
                dur={dur as string} begin={delay as string}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </line>
          );
        })}

        {/* ── Network nodes ── */}
        {[
          [120,180,'#e46f1e'], [380,80,'#2b6ef2'],  [680,200,'#e46f1e'],
          [920,100,'#2b6ef2'], [1240,220,'#7c3aed'], [200,500,'#059669'],
          [560,420,'#e46f1e'], [860,540,'#2b6ef2'],  [1180,480,'#e46f1e'],
          [1380,620,'#7c3aed'],
        ].map(([cx,cy,color],i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={color as string}
            filter="url(#node-glow)" opacity="0.85">
            <animate attributeName="r" values="3;5;3" dur={`${4+i*0.7}s`}
              begin={`${i*0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur={`${5+i*0.5}s`}
              begin={`${i*0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* ══ 3. Ambient colour orbs ════════════════════════════════ */}
      {/* Orb A — warm orange, top-left */}
      <div className="absolute rounded-full"
        style={{ top:'-12%', left:'-8%', width:'55vw', height:'55vw',
          background:'radial-gradient(circle,rgba(228,111,30,0.11) 0%,rgba(245,158,66,0.04) 44%,transparent 70%)',
          filter:'blur(68px)', animation:'sb-orb-a 32s ease-in-out infinite', willChange:'transform' }} />

      {/* Orb B — cool blue, bottom-right */}
      <div className="absolute rounded-full"
        style={{ bottom:'-14%', right:'-10%', width:'52vw', height:'52vw',
          background:'radial-gradient(circle,rgba(43,110,242,0.08) 0%,transparent 65%)',
          filter:'blur(76px)', animation:'sb-orb-b 40s ease-in-out infinite', willChange:'transform' }} />

      {/* Orb C — warm, mid-page */}
      <div className="absolute rounded-full"
        style={{ top:'40%', left:'33%', width:'38vw', height:'38vw',
          background:'radial-gradient(circle,rgba(228,111,30,0.06) 0%,transparent 68%)',
          filter:'blur(58px)', animation:'sb-orb-c 50s ease-in-out infinite', willChange:'transform' }} />

      {/* Orb D — violet, top-right */}
      <div className="absolute rounded-full"
        style={{ top:'-6%', right:'8%', width:'35vw', height:'35vw',
          background:'radial-gradient(circle,rgba(124,58,237,0.055) 0%,transparent 70%)',
          filter:'blur(62px)', animation:'sb-orb-d 58s ease-in-out infinite', willChange:'transform' }} />

      {/* ══ 4. Dot grid — slow drift ══════════════════════════════ */}
      <div className="absolute inset-0 opacity-[0.36]"
        style={{
          backgroundImage:'radial-gradient(circle,rgba(15,20,30,0.065) 1px,transparent 1px)',
          backgroundSize:'30px 30px',
          animation:'sb-grid-drift 80s linear infinite',
          willChange:'background-position',
        }} />

      {/* Top white vignette — keeps navbar legible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fdfcfb]/90 to-transparent" />

      <style>{`
        @keyframes sb-orb-a {
          0%,100%{transform:translate(0,0) scale(1);}
          33%{transform:translate(3%,-4%) scale(1.06);}
          66%{transform:translate(-2%,3%) scale(0.96);}
        }
        @keyframes sb-orb-b {
          0%,100%{transform:translate(0,0) scale(1.04);}
          40%{transform:translate(-4%,5%) scale(0.95);}
          80%{transform:translate(3%,-3%) scale(1.08);}
        }
        @keyframes sb-orb-c {
          0%,100%{transform:translate(0,0) scale(1);}
          50%{transform:translate(5%,6%) scale(1.1);}
        }
        @keyframes sb-orb-d {
          0%,100%{transform:translate(0,0) scale(1.02);}
          35%{transform:translate(-5%,4%) scale(0.94);}
          70%{transform:translate(4%,-3%) scale(1.06);}
        }
        @keyframes sb-grid-drift {
          0%{background-position:0px 0px;}
          100%{background-position:30px 30px;}
        }
        @media (prefers-reduced-motion:reduce){
          .pointer-events-none.fixed[aria-hidden="true"] *{
            animation:none !important;
          }
        }
      `}</style>
    </div>
  );
}
