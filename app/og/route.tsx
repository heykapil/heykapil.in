/* eslint-disable react/no-unknown-property */

import { ImageResponse } from "next/og";
import { type NextRequest, NextResponse } from "next/server";
import clsx from "clsx";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const subtitle = searchParams.get("subtitle");
    const url = searchParams.get("url");
    const bg = searchParams.get("bg");
    const logo = searchParams.get("logo");

    if (!title) {
      return NextResponse.json(
        {
          error: "Missing title",
        },
        {
          status: 400,
        }
      );
    }

    const Hubot = await fetch(
      new URL(
        "http://cdn.kapil.app/fonts/Hubot-Sans-Medium.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          tw={clsx(
            "w-full h-full relative",
            "flex flex-row-reverse justify-center"
          )}
        >
          {bg && (
            <div tw={clsx("flex flex-1 h-full")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bg}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <div tw={clsx("flex flex-1 h-full relative")}>
            <div
              style={{
                transform: "skewX(-16deg)",
                backgroundImage: `url(https://cdn.kapil.app/images/website/og-background.png)`,
              }}
              tw={clsx("flex", "-right-24 absolute inset-y-0 -left-26")}
            />
            <div
              tw={clsx(
                "flex h-full w-full flex-col items-start justify-center text-white",
                {
                  "text-center items-center p-24": !bg,
                  "p-12": bg,
                }
              )}
              style={{ fontFamily: "Hubot" }}
            >
              <h1
                tw={clsx("mb-0 text-white", {
                  "text-6xl": !bg,
                  "text-5xl": bg,
                })}
                style={{ fontFamily: "Hubot", lineHeight: 1.6 }}
              >
                {title}
              </h1>
              {subtitle && <p tw={"m-0 mt-4 text-2xl mb-0"}>{subtitle}</p>}

              <div tw={"absolute flex left-12 mb-0 m-0 bottom-12 items-center"}>
                {logo && (
                  <img
                    src={logo}
                    alt="logo"
                    tw={clsx("rounded-full w-8 h-8 self-center mr-2")}
                    width={20}
                    height={20}
                  />
                )}
                <p tw={clsx("text-2xl")} style={{ fontFamily: "Hubot" }}>
                  {url ? url : `kapil.app`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Hubot",
            data: Hubot,
          },
        ],
      }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Failed to generate bg",
      },
      {
        status: 500,
      }
    );
  }
};
