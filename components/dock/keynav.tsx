"use client";
import React, { useState, useRef } from "react";
import { useKey } from "react-use";
import { useRouter } from "next/navigation";
import { QuestionIcon } from "../Icons";
import {
  GitHubIcon,
  TwitterIcon,
  HomeIcon,
  FileIcon,
  BlogIcon,
  GalleryIcon,
  MailIcon,
} from "../Icons";

const KeyNav = () => {
  //   const [play] = useSound("../button.mp3");
  const router = useRouter();

  // useEffect only runs on the client, so now we can safely show the UI
  //const [count, set] = useState(0);
  const home = () => {
    // play()
    router.push("/");
  };
  const blog = () => {
    // play()
    router.push("/blog");
  };
  const snippet = () => {
    // play()
    router.push("/snippet");
  };
  const gallery = () => {
    // play()
    window.open("https://gallery.heykapil.in", "_blank");
  };

  const twitter = () => {
    // play()
    window.open("https://x.com/kapiljch", "_blank");
  };
  const mail = () => {
    // play()
    window.open("mailto:contact@heykapil.com", "_blank");
  };
  const github = () => {
    // play()
    window.open("https://github.com/heykapil", "_blank");
  };

  useKey("1", home);
  useKey("2", blog);
  useKey("3", snippet);
  useKey("4", gallery);
  useKey("m", mail);
  useKey("g", github);
  useKey("x", twitter);
  //   useKey('7', page7);
  // show= showPopover , setShowPopover = useeshow
  const [show, useeShow] = useState(false);
  const targetRef = useRef(null);
  const keyNavFun = () => {
    useeShow(!show);
  };
  const handleOverlayClose = () => {
    useeShow(false);
  };
  const parentFun = () => {
    keyNavFun();
    // play()
  };
  return (
    <div className='key_nav flex'>
      <div ref={targetRef} className='' onClick={() => parentFun()}>
        <QuestionIcon className='relative h-[48px] w-[48px]' />
      </div>
      <div
        className={
          show ? "key_nav_content show_ele" : "key_nav_content hide_ele"
        }
      >
        <div
          className='absolute -top-[5px] -right-[5px] bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg'
          onClick={handleOverlayClose}
        >
          <svg width='15' height='15' viewBox='0 0 15 15' fill='none'>
            <path
              d='M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <div className='font-bold -inset-4'>Keyboard Shortcuts ∙ ⇧?</div>
        <div className='elements mt-4'>
          <div className='element'>
            <div className='icon_element'>
              <HomeIcon className='relative h-4/5 w-4/5' aria-label='none' />
            </div>
            <div className='title_element'>Home</div>
            <div className='number_element'>
              <span>1</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <BlogIcon className='relative h-4/5 w-4/5' aria-label='none' />
            </div>
            <div className='title_element'>Blog</div>
            <div className='number_element'>
              <span>2</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <FileIcon className='relative h-4/5 w-4/5' aria-label='none' />
            </div>
            <div className='title_element'>Snippet</div>
            <div className='number_element'>
              <span>3</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <GalleryIcon className='relative h-4/5 w-4/5' aria-label='none' />
            </div>
            <div className='title_element'>Gallery</div>
            <div className='number_element'>
              <span>4</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <MailIcon className='relative h-4/5 w-4/5' />
            </div>
            <div className='title_element'>Email</div>
            <div className='number_element'>
              <span>M</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <GitHubIcon className='relative h-4/5 w-4/5' />
            </div>
            <div className='title_element'>Github</div>
            <div className='number_element'>
              <span>G</span>
            </div>
          </div>

          <div className='element'>
            <div className='icon_element'>
              <TwitterIcon className='relative h-4/5 w-4/5' />
            </div>
            <div className='title_element'>X(Twitter)</div>
            <div className='number_element'>
              <span>X</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KeyNav;
