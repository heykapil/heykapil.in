'use client'
import React from "react"
import { useKey } from 'react-use';
import { useRouter } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTheme } from "next-themes";
import {
  // DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  GitHubLogoIcon,
  SunIcon,
  MoonIcon,
  EnvelopeOpenIcon
} from '@radix-ui/react-icons';
import { QuestionIcon, TwitterIcon} from "../Icons";
import Link from "next/link";
// import Link from "../Link";

const HeaderInfo = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  // const [person, setPerson] = React.useState('pedro');
  const [isCopied, setIsCopied] = React.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    // setTimeout(() => {
    //   setIsCopied(false);
    // }, 10000);
  };
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme()
  // useEffect only runs on the client, so now we can safely show the UI
  //const [count, set] = useState(0);
  const home = () => {
    // play()
    router.push('/');
  
  }
  const blog = () => {
    // play()
    router.push('/blog');
   
  }
  const snippet = () => {
    // play()
    router.push('/snippet');
    
  }
  const gallery = () => {
    // play()
    window.open('https://gallery.heykapil.in', '_blank');
  }

  const twitter = () => {
    // play()
    window.open('https://x.com/kapiljch', '_blank');
  }
  const mail = () => {

    window.open('mailto:contact@heykapil.com', '_blank');
  }
  const github = () => {
    // play()
    window.open('https://github.com/heykapil', '_blank');
  }

  useKey('1', home);
  useKey('2', blog);
  useKey('3', snippet);
  useKey('4', gallery);
  useKey('m', mail);
  useKey('g', github);
  useKey('x', twitter);
//   useKey('7', page7);
// show= showPopover , setShowPopover = useeshow
  // const [show, useeShow] = useState(false);
  // const targetRef = useRef(null);
  // const keyNavFun = () => {
  //   useeShow(!show);
  // }
  // const handleOverlayClose = () => {
  //   useeShow(false);
  // };
  // const parentFun = () => {
  //   keyNavFun();
  //   // play()
  // }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[48px] h-[48px] inline-flex items-center justify-center outline-none"
          aria-label="Customise options"
        >
          <QuestionIcon className="w-4/5 h-4/5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-[#F6F5F1] dark:bg-[#090a0e] bg-opacity-50 dark:bg-opacity-50 inset-0 z-50 backdrop-blur-lg backdrop-filter rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Label className="pl-[25px] flex text-xs items-start  justify-center text-black dark:text-white">
            Keyboard Shortcuts &nbsp; &nbsp;&nbsp; &nbsp; ∙ &nbsp; &nbsp; &nbsp; &nbsp; ⇧?
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="h-[1px] bg-gray-300 dark:bg-gray-700 m-[5px]" />
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50  data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
           {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <HomeIcon className="relative w-3/5 h-3/5" /></div> */}
           Home{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              1
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
           {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <BlogIcon className="relative w-3/5 h-3/5" /></div> */}
            Blog{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              2
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
           {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <FileIcon className="relative w-3/5 h-3/5" /></div> */}
            Snippets{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              3
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
           {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <GalleryIcon className="relative w-3/5 h-3/5" /></div> */}
            Gallery{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              4
            </div>
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item
            className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800"
            disabled
          >
            New Private Window{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⇧+⌘+N
            </div>
          </DropdownMenu.Item> */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-zinc-200 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-white data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
             {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> @ </div> */}
              Social
              <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[220px] bg-[#F6F5F1] dark:bg-[#090a0e] bg-opacity-50 dark:bg-opacity-50 z-51 backdrop-blur-lg backdrop-filter rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.CheckboxItem className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                  <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <EnvelopeOpenIcon /></div>
                  Email{' '}
                  <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    M
                  </div>
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <GitHubLogoIcon /></div>
                 Github{' '}
                  <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    G
                  </div>
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                  <div className="absolute left-0 w-[25px] inline-flex items-center justify-center"> <TwitterIcon className="w-3/5 h-3/5" /></div>
                  Twitter(X){' '}
                  <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    X
                  </div>
                </DropdownMenu.CheckboxItem>

                {/* <DropdownMenu.Item className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                  Create Shortcut…
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                  Name Window…
                </DropdownMenu.Item> */}
                <DropdownMenu.Separator className="h-[1px] bg-gray-300 dark:bg-gray-700 m-[5px]" />
                <Link href="//contact.heykapil.in" target="_blank">
                <DropdownMenu.Item className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800">
                 Contact Form
                </DropdownMenu.Item>
                </Link>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="h-[1px] bg-gray-300 dark:bg-gray-700 m-[5px]" />

          <DropdownMenu.CheckboxItem
            className="group text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800"
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
            onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
          >
            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
              {/* <CheckIcon /> */}
            </DropdownMenu.ItemIndicator>   
              Change Theme{' '}
            <div className="ml-auto pl-[20px] text-mauve11 dark:text-mauve2 dark:group-data-[highlighted]:text-black group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                {resolvedTheme === 'dark' ? ( <SunIcon /> ) : ( <MoonIcon /> )}
            </div>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800"
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            <button className="" onClick={copy}>{isCopied ? "Copied!" : "Copy URL"}</button>
          </DropdownMenu.CheckboxItem>
          
          {/* <DropdownMenu.Separator className="h-[1px] bg-gray-300 dark:bg-gray-700 m-[5px]" />

          <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11 dark:text-mauve2">
            People
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem
              className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800"
              value="pedro"
            >
              <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="text-[13px] leading-none text-violet-600 dark:text-fuchsia-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 dark:data-[highlighted]:bg-rose-50 data-[highlighted]:text-violet1 dark:data-[highlighted]:text-stone-800"
              value="colm"
            >
              <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup> */}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeaderInfo;