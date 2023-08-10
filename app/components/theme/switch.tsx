'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '../Icons'
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className='relative flex h-full w-full items-center justify-center'
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}>
          {mounted && (
                      <div
                        className=""
                      >
          {resolvedTheme === 'dark' ? (
                          <MoonIcon className='relative h-4/5 w-4/5' />
                        ) : (
                          <SunIcon className='relative h-4/5 w-4/5' />
                        )}
                      </div>
                    )}
          </div>
  )
}

export default ThemeSwitch