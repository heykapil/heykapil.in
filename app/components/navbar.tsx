'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type HeaderLinks = {
    // icon: React.ReactNode
    href: string
    text: string
  }[]

const HEADER_LINKS: HeaderLinks = [
    {
    //   icon: <IconPencil size={14} />,
      href: '/blog',
      text: 'Blog',
    },
    {
    //   icon: <IconMessageCircle size={14} />,
      href: '/guestbook',
      text: 'Guestbook',
    },
    {
    //   icon: <IconChartBar size={14} />,
      href: '/dashboard',
      text: 'Dashboard',
    },
    {
    //   icon: <IconFlame size={14} />,
      href: '/projects',
      text: 'Projects',
    },
    {
    //   icon: <IconUserCircle size={14} />,
      href: '/about',
      text: 'About',
    },
    {
    //   icon: <IconDeviceDesktop size={14} />,
      href: '/uses',
      text: 'Uses',
    },
  ]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <ul className='hidden space-x-2 md:flex'>
      {HEADER_LINKS.map((link) => (
        <li key={link.text}>
          <Link
            className={clsx(
              'rounded px-3 py-2 text-sm font-medium transition-colors duration-150',
              {
                ['text-accent-5 hover:bg-gray-500 hover:text-accent-fg']:
                  link.href !== pathname,
              },
              {
                ['bg-blue-500']: link.href === pathname,
              },
            )}
            href={link.href}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Navbar