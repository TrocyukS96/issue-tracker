'use client'
import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { link } from 'fs'

const links = [
  {
    label:'Dashboard',
    href:'/'
  },
  {
    label:'Issues',
    href:'/issues'
  }
]

const Navbar = () => {
  const currentPath = usePathname()
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'><AiFillBug/></Link>
      <ul className='flex space-x-6 '>
        {
          links.map(el=>(
            <li key={el.href}>
              <Link className={classNames({
                'text-zinc-900':el.href===currentPath,
                'text-zinc-500':el.href !== currentPath,
                'hover:text-zinc-800 transition-colors':true
              })} href={el.href}>{el.label}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar