"use client";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import GallerySkelton from "./gallery/gallerySkelton";
// const TopTracksClient = dynamic(() => import("./spotify/TopTracksClient"));
const DynamicGallery = dynamic(() => import("./gallery/gallery"), {
  loading: () => <GallerySkelton />,
});
const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <>
      <div className='flex flex-col px-4 py-0 mx-auto space-y-2 lg:py-0 lg:flex-row lg:justify-center lg:items-center h-[60vh] z-1'>
        <div className='w-full relative z-1 lg:w-[40%]'>
          <motion.div
            className='lg:max-w-lg'
            initial='hidden'
            animate='show'
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.div
              className='block lg:hidden my-8'
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Image
                alt='Kapil Chaudhary'
                height={100}
                width={100}
                src='https://raw.githubusercontent.com/heykapil/new-blog/57d8a9d29a6441315316942d5abccbc1810ea876/public/avatar.jpg'
                priority
                className='rounded-full'
              />
            </motion.div>
            <motion.h1
              className='text-3xl font-semibold tracking-wide lg:text-4xl'
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              Kapil Chaudhary
            </motion.h1>
            <motion.p className='mt-4' variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <span className='mb-4'>
                Ph.D. student at{" "}
                <span className='font-semibold'>Gujarat University</span>
              </span>
              <svg
                aria-hidden='true'
                width='80'
                height='16'
                viewBox='0 0 432 38'
                fill='#666666'
                className='mb-8'
              >
                <path d='M402.74 37.5899C390.193 37.5899 374.767 21.3129 374.111 20.6249C367.068 12.4335 359.943 5.14795 349.463 5.14795C337.975 5.14795 324.479 20.406 324.338 20.558L323.17 21.8313C315.729 29.9329 308.701 37.5893 296.186 37.5893C283.639 37.5893 268.213 21.3123 267.557 20.6243C260.514 12.4329 253.389 5.14734 242.909 5.14734C231.421 5.14734 217.925 20.4053 217.784 20.5573L216.683 21.7175C208.186 30.5847 201.48 37.5885 189.636 37.5885C177.085 37.5885 161.656 21.3115 161.007 20.6235C153.96 12.4321 146.831 5.14655 136.359 5.14655C124.871 5.14655 111.375 20.4045 111.234 20.5565L110.054 21.8417C102.62 29.9394 95.5889 37.5837 83.0769 37.5837C70.5259 37.5837 55.0969 21.3067 54.4479 20.6187C47.401 12.4273 40.2719 5.14175 29.7999 5.14175C19.3699 5.14175 9.86587 10.8722 4.98787 20.0987C4.3824 21.2549 2.94488 21.6964 1.78478 21.087C0.628579 20.4698 0.187069 19.0401 0.800389 17.8839C6.50349 7.10691 17.6124 0.403931 29.7964 0.403931C42.2694 0.403931 50.5504 8.82583 57.9644 17.4469C61.941 21.6774 74.3554 32.8419 83.0734 32.8419C93.5074 32.8419 99.2644 26.5724 106.557 18.6349L107.702 17.3888C108.268 16.7404 122.733 0.404816 136.35 0.404816C148.823 0.404816 157.104 8.82671 164.518 17.4478C168.494 21.6783 180.909 32.8428 189.627 32.8428C199.447 32.8428 204.943 27.1123 213.256 18.4368L214.295 17.3509C214.83 16.7337 229.295 0.401917 242.908 0.401917C255.388 0.401917 263.67 8.82382 271.076 17.4449C275.053 21.6676 287.467 32.8359 296.185 32.8359C306.623 32.8359 312.388 26.5625 319.685 18.6129L320.822 17.3785C321.388 16.7301 335.853 0.394531 349.463 0.394531C361.943 0.394531 370.225 8.81643 377.631 17.4375C381.607 21.6602 394.022 32.8285 402.74 32.8285C412.744 32.8285 422.06 27.4379 427.064 18.7625C427.716 17.6258 429.161 17.2313 430.302 17.8914C431.435 18.5438 431.822 19.993 431.173 21.1258C425.321 31.2898 414.427 37.5908 402.739 37.5908L402.74 37.5899Z' />
              </svg>
            </motion.p>
            <motion.p variants={FADE_DOWN_ANIMATION_VARIANTS}>
              I am currently working as Junior Research Fellow in the area of
              fractional-order dynamical systems under{" "}
              <span className='italic'>Prof. Nita H. Shah.</span>
            </motion.p>
            <motion.p
              className='mt-2 mb-2'
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              I am being funded by{" "}
              <Link
                className='animate-text-shimmer bg-[linear-gradient(110deg,#f43f5e,45%,#ec4899,55%,#d946ef)] bg-[length:250%_100%] dark:bg-[linear-gradient(110deg,#F6A6A6,45%,#171717,55%,#F6A6A6)] inline-block cursor-ne-resize bg-clip-text text-transparent transition-transform duration-200 ease-in-out hover:scale-105'
                href='https://csirhrdg.res.in/'
                target='_blank'
                rel='noopener noreferrer'
              >
                CSIR-HRDG, India.
              </Link>
            </motion.p>

            <motion.p
              className='mt-2 mb-2'
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              You can follow me on{" "}
              <Link
                aria-label='x'
                className='underline'
                href='//x.com/kapiljch'
                target='_blank'
                rel='noreferrer nofollow'
              >
                X
              </Link>
              .
            </motion.p>
            {/* <motion.div className='flex items-center justify-start mt-2'>
                <motion.p
                  className='font-bold'
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  Current Stack -{" "}
                </motion.p>
                <motion.img
                  src='https://skillicons.dev/icons?i=typescript,nextjs,tailwind,vscode,prisma&theme=light'
                  alt='tech'
                  className='hidden dark:block w-24 md:w-32 ml-3'
                  loading='lazy'
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                />
                <motion.img
                  src='https://skillicons.dev/icons?i=typescript,nextjs,tailwind,vscode,prisma&theme=dark'
                  alt='tech'
                  className='block dark:hidden w-24 md:w-32 ml-3'
                  loading='lazy'
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                />
              </motion.div> */}
          </motion.div>
          {/*             
            <div className='mt-10 flex flex-col sm:flex-row items-center'>
              <button
                className='py-2.5 px-5 rounded-md bg-blue-700 text-white font-semibold tracking-wide hover:bg-blue-600'
                aria-label='contactme'
                onClick={() => {
                  window.open("mailto:contact@heykapil.in", "_blank");
                }}
              >
                Contact me
              </button>
              <div className='mt-5 sm:mt-0 sm:ml-5 inline-flex items-center'>
                <Link
                  aria-label='x'
                  className='mx-3'
                  href='https://x.com/kapiljch'
                  target='_blank'
                  rel='noreferrer nofollow'
                >
                  <svg
                    className='w-7 h-7 transform hover:scale-105'
                    role='img'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                  </svg>
                </Link>
              </div> 
            </div>*/}
        </div>
        <div className='items-center justify-normal w-full h-fit hidden lg:flex lg:w-1/2'>
          <Suspense>
            <DynamicGallery />
          </Suspense>
        </div>
      </div>

      {/* <Suspense>
        <TopTracksClient />
      </Suspense> */}
      {/* <div className='container flex flex-row mx-auto w-full space-x-3'>
          <Link href="mailto:contact@heykapil.in">
            <MailIcon />
          </Link>
          <Link href="https://github.com/heykapil" className='' target='_blank'>
            <GitHubIcon />
          </Link>
          <Link href="https://x.com/kapiljch" className='' target='_blank'>
            <TwitterIcon />
          </Link>
        </div> */}
      {/* <section className='container mx-auto'>
        <div>
          <p>
            As I explore the fascinating world of chaos theory, fractals, and
            nonlinear dynamics, I'm continuously amazed by the elegant
            mathematical structures that underlie the seemingly chaotic
            phenomena around us. But my interests extend beyond the confines of
            research papers and chalkboards. I'm equally enchanted by the art of
            coding. Through this website, I aim to share my passion for
            mathematics, coding, and the fascinating world of dynamical systems.
            You'll find a collection of blog posts, snippets, and insights that
            traverse these diverse realms.
          </p>
        </div>
      </section> */}
    </>
  );
};

export default Hero;
