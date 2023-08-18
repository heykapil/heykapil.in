import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const postPath = searchParams.get('path');
  const font = fetch(
    new URL('../../../public/fonts/kaisei-tokumin-bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: "linear-gradient(to right, #FFEFBA, #FFFFFF)"
          // backgroundImage: 'url(http://localhost:3000/og-bg.png)',
        }}
      >
        <svg
            style={{
              opacity: 0.25,
              position: 'absolute',
              top: 0,
              left: 0,
              mixBlendMode: 'normal',
              pointerEvents: 'none',
              isolation: 'isolate',
              zIndex: '50',
            }}  
            width="100%"
            height="100%"
          >
            <filter id="pedroduarteisalegend">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#pedroduarteisalegend)"></rect>
          </svg> 
            <div
              style={{
                marginLeft: 80,
                marginRight: 80,
                display: 'flex',
                fontSize: 100,
                fontFamily: 'Kaisei Tokumin',
                letterSpacing: '-0.05em',
                fontStyle: 'normal',
                color: '#222222',
                // lineHeight: '120px',
                whiteSpace: 'pre-wrap',
                alignContent: 'center'
              }}
            >
              {postTitle}
            </div>
             <div
              style={{
                marginTop: 280,
                // marginRight: 80,
                display: 'flex',
                fontSize: 35,
                fontFamily: 'Kaisei Tokumin',
                letterSpacing: '0.05em',
                fontStyle: 'underline',
                color: '#222222',
                alignItems: 'flex-end',
                whiteSpace: 'pre-wrap',
                alignContent: 'center'
              }}
            >
              www.heykapil.in/{postPath}
            </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Kaisei Tokumin',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}