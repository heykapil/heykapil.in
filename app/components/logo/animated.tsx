"use client";

export default function AnimatedLogo({ className }: { className?: string }) {
    return (
        <div className={`${className} text-black dark:text-white`}>
            <style jsx>{`
        /* 1. Base styles for the strokes */
        .hw-path {
          fill: none;
          stroke: currentColor;
          stroke-width: 4; /* I adjusted this to be bolder */
          stroke-linecap: round;
          stroke-linejoin: round;
          
          /* Prepare for animation */
          stroke-dasharray: 200; /* Enough to cover the longest stroke */
          stroke-dashoffset: 200; /* Start hidden */
          opacity: 0; 
          
          /* The Animation: Draw + Fade In */
          animation: drawStroke 0.8s ease-out forwards;
        }

        @keyframes drawStroke {
          0% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        /* 2. SEQUENTIAL TIMING (The Relay Race) */
        
        /* Letter K (Vertical line) */
        .path-1 { animation-delay: 0.0s; }
        
        /* Letter K (The < part) */
        .path-2 { animation-delay: 0.4s; }
        
        /* Letter a */
        .path-3 { animation-delay: 0.9s; }
        
        /* Letter p (Vertical line) */
        .path-4 { animation-delay: 1.5s; }
        
        /* Letter p (The loop) */
        .path-5 { animation-delay: 1.8s; }
        
        /* Letter i/l (The tall loop) - Note: I swapped order slightly for flow */
        .path-7 { animation-delay: 2.5s; }
        
        /* The dot (i) - Comes last */
        .path-6 { animation-delay: 3.2s; }

      `}</style>

            {/* I adjusted the viewBox from "0 0 300 300" to "20 90 130 90".
         This crops the empty space so the logo is nice and big.
      */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="20 90 130 90"
                className="w-full h-auto"
            >
                <g>
                    {/* K: Vertical */}
                    <path className="hw-path path-1" d="M28.36,98.73c0,22.84-.65,45.57-.65,68.4" />

                    {/* K: Chevron */}
                    <path className="hw-path path-2" d="M54.17,97.44c-1.26,6.31-22.56,41.79-27.1,40.65-.62-.16,3.16-2.82,9.68,4.52,6.77,7.61,14.08,15.08,19.36,23.88" />

                    {/* a */}
                    <path className="hw-path path-3" d="M74.18,131c-9.05,6.79-13.9,11.3-12.91,23.23.09,1.04,1,6.19,2.58,6.45,4.12.69,8.54-17.31,9.03-20,.39-2.13.65-8.61.65-6.45,0,9.7-.7,24.52,11.62,24.52" />

                    {/* p: Vertical */}
                    <path className="hw-path path-4" d="M83.86,131c0,18.37,1.94,39.82,1.94,60.01" />

                    {/* p: Loop */}
                    <path className="hw-path path-5" d="M82.57,132.93c4.38-.88,7.02-2.35,11.62-1.29,18.62,4.3,1.77,22.17-6.45,27.1-.99.6-3.23.13-3.23,1.29,0,2.38,4.73-.84,7.1-.65,8.44.7,20.03,1.11,21.94-10.32.21-1.27,1.15-3.29,0-3.87-1.83-.91,1.1,10.02,3.23,11.62" />

                    {/* i Dot (Notice I kept the ID but logic puts it last) */}
                    <path className="hw-path path-6" d="M113.54,135.51c.06.3-.34.65-.65.65" strokeWidth="5" />

                    {/* i/l body */}
                    <path className="hw-path path-7" d="M116.12,157.45c15.07-1.88,19.17-17.02,20-30.33.07-1.1-.23-18.75-1.94-18.07-10.46,4.19-10.27,43.88,2.58,43.88" />
                </g>
            </svg>
        </div>
    );
}