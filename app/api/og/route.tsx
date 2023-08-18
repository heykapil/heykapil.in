import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import randomColor from "randomcolor";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const postPath = searchParams.get('path');
  const font = fetch(
    new URL('../../../public/fonts/kaisei-tokumin-bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;
  var lightcolors= ['#92c5f4','#6a9ae8','#b3e6fc','#b6a2ef','#dbb4f7','#c2e7fc','#a3ff82','#ed817d','#fc88cc','#c9ebff','#9386f4','#d4c9ff','#a693f2','#fca599','#bef779','#8bf4d5','#abfcf7','#c2c8f9','#fff7bc','#b4ff82','#b798f2','#fcedb5','#a0ffbc','#93eaed','#efae83','#f9f97a','#92d2fc','#a5e4ef','#80f780','#e7ccff','#75ea88','#fc7efc','#a2ed6d','#fcc5bf','#86f4ad','#8cf2bf','#e86d77','#beff89','#f290f9','#80fcc4','#b597f4','#f99f89','#c3fc92','#fcf9b8','#71e0ed','#fce0c4','#ef819d','#b07de8','#fff4bf','#7cef8f','#ffa393','#b2ffe4','#8ef9bb','#b79af9','#a3ffb2','#81efdf','#f9cf9f','#8ef29f','#9df9b1','#f78880','#c9dcff','#6478db','#f5fca9','#c5f9a4','#89a0e5','#d576f7','#b6ffa5','#c8c4fc','#91ff9e','#c4d3fc','#ffba75','#bbf4f7','#f475e1','#a1f76f','#8f9ae8','#a9f27b','#a6e9f4','#f4cc90','#67c4e0','#f28379','#ffccf0','#e885f7','#fcbaf2','#ffbac3','#c7ffaf','#ade7f4','#f9c8b3','#f5c0f9','#85fccc','#8aea75','#8bbce8','#818df4','#d49df2','#efffaf','#cb77f4','#a7b9f9','#ddc2f9','#7097e5','#baf5ff','#ff87fd']
  const lightcolor1 = lightcolors[Math.floor(Math.random()* lightcolors.length)];
  const lightcolor2 = lightcolors[Math.floor(Math.random()* lightcolors.length)];
  // const light-color-array-of-100-colors = randomColor({ luminosity: "light", count: 100 });
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
          background: "linear-gradient(to right, "+ lightcolor1 +" , "+ lightcolor2 + ")"
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