import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const postPath = searchParams.get("path");
  const font = fetch(
    new URL(
      "http://cdn.kapil.app/fonts/GoogleSans-Regular.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());
  const fontData = await font;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(to right, " + `#fff` + " , " + `#fafaf9` + ")",
        }}
      >
        <div
          style={{
            marginLeft: 80,
            marginRight: 80,
            display: "flex",
            fontSize: 80,
            fontFamily: "Google Sans",
            letterSpacing: "0.025em",
            fontStyle: "normal",
            color: "#404040",
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            marginTop: 180,
            display: "flex",
            fontSize: 30,
            fontFamily: "Google Sans",
            letterSpacing: "0.025em",
            color: "#737373",
            alignItems: "flex-end",
            whiteSpace: "pre-wrap",
            alignContent: "center",
          }}
        >
          <span
            style={{
              color: `#22c55e`,
            }}
          >
            https://
          </span>
          kapil.app/{postPath}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 700,
      fonts: [
        {
          name: "Google Sans",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
