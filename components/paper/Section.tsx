import React from "react";
import { papers } from "@/lib/data/papers";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { slideInVariants } from "@/lib/framer-motion/slide-in";
import { scaleHoverVariants } from "lib/framer-motion/scale-hover";
import { motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function PaperSection() {
  return (
    <section>
      <motion.div
        variants={slideInVariants()}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-64px" }}
      >
        <h1 className='font-bold text-2xl mb-8 tracking-tighter'>
          Research Articles
        </h1>
        <ul className='grid gap-8 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
          <LayoutGroup>
            {papers.map((paper, index) => (
              <li key={paper.slug}>
                <motion.div
                  key={paper.slug}
                  variants={{
                    ...slideInVariants({ from: "bottom", delay: index * 0.05 }),
                    ...scaleHoverVariants(),
                  }}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: "-64px" }}
                  whileHover='hover'
                  //   layoutId={`${paper.slug}-container`}
                >
                  <Dialog.Root>
                    <Dialog.Trigger aria-controls='radix-:R16jcr6cq:' asChild>
                      <Link
                        href={`#${paper.slug}`}
                        className='flex flex-col p-4 transition bg-[var(--background)] border border-[var(--offset2)] hover:border-none rounded-xl hover:bg-[var(--offset2)]'
                      >
                        <motion.div className='relative grid grid-cols-1 xl:grid-cols-[480px,400px] gap-10'>
                          <Image
                            src={`https://heykapil.in/api/og?title=${paper.title}&path=paper%23${paper.slug}`}
                            alt={paper.title}
                            className='rounded-xl'
                            loading='lazy'
                            width={365}
                            height={120}
                            placeholder='blur'
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              shimmer(365, 120)
                            )}`}
                          />
                        </motion.div>
                        <div className='flex flex-col gap-1 mt-4'>
                          <p className='font-medium text-base'>{paper.title}</p>
                          {/* <p className='text-gray-500 md:text-lg'>{paper.tags}</p> */}
                        </div>
                      </Link>
                    </Dialog.Trigger>
                    <Dialog.Portal id={`#${paper.slug}`}>
                      <Dialog.Overlay className='bg-[var(--background)] text-[var(--foreground)] data-[state=open]:animate-overlayShow fixed inset-0 bg-opacity-50 backdrop-blur-lg backdrop-filter' />
                      <Dialog.Content className='overflow-scroll data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] lg:h-[40vw] w-[90vw] lg:w-[70vw] max-w-[450px] lg:max-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[var(--foreground)_0px_10px_38px_-10px] focus:outline-none'>
                        <Dialog.Title className='m-0 text-lg font-serif font-semibold'>
                          {paper.title}
                        </Dialog.Title>
                        <div className='w-full flex gap-2'>
                          <aside className='text-sm italic font-normal'>
                            Nita Shah, Kapil Chaudhary
                            {paper?.authors ? <>, {paper.authors}</> : ""}
                          </aside>
                          <span className='flex-grow flex-shrind border-b border-dotted border-[var(--foreground)] h-3' />
                        </div>
                        <script
                          type='application/ld+json'
                          suppressHydrationWarning
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify(paper.abstract),
                          }}
                        ></script>
                        <div className='flex cursor-pointer gap-2'>
                          <div className='w-full lg:w-7/12 flex flex-col justify-center'>
                            <p className='text-base lg:text-sm my-2 font-base'>
                              {paper.abstract}
                            </p>
                            <div className='flex text-xs'>
                              <Link
                                className='font-bold tracking-wide text-sm text-pink-400'
                                href={paper.journal_link}
                                target='_blank'
                                aria-label={paper.journal}
                              >
                                {paper?.journal}
                              </Link>
                            </div>
                            <div className='text-sm text-text2 tracking-wider'>
                              <ul className='list list-inside list-disc'>
                                {paper?.date_published ? (
                                  <li>Published on {paper.date_published}</li>
                                ) : (
                                  ""
                                )}
                                {paper?.doi ? <li>{paper.doi}</li> : ""}
                                {paper?.issn ? <li>{paper.issn}</li> : ""}
                              </ul>
                            </div>
                            <div className='flex flex-1'>.</div>
                          </div>
                          <div className='relative hidden lg:flex lg:w-5/12'>
                            {paper.imagesrc ? (
                              <Image
                                src={
                                  paper?.imagesrc ||
                                  `https://heykapil.in/api/og?title=${paper.title}&path=paper%23${paper.slug}`
                                }
                                className='px-2'
                                width={400}
                                height={800}
                                alt={paper.title}
                                loading='lazy'
                                placeholder='blur'
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                  shimmer(400, 800)
                                )}`}
                              />
                            ) : (
                              <Image
                                src={
                                  paper?.imagesrc ||
                                  `https://heykapil.in/api/og?title=${paper.title}&path=paper%23${paper.slug}`
                                }
                                className='px-2'
                                fill
                                objectFit='contain'
                                objectPosition='top center'
                                alt={paper.title}
                                loading='lazy'
                                // placeholder='blur'
                                // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                //   shimmer(900, 1600)
                                // )}`}
                              />
                            )}
                          </div>
                        </div>
                        <Dialog.Close asChild>
                          <button
                            className='absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-none focus:outline-none'
                            aria-label='Close'
                            id='closeModalDialog'
                          >
                            <Cross2Icon />
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </motion.div>
              </li>
            ))}
          </LayoutGroup>
        </ul>
      </motion.div>
    </section>
  );
}
