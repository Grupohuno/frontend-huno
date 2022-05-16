import React from 'react'
import navbarStyles from '../styles/Navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className={navbarStyles.nav}>
        <ul>
            <li>
                <Link href={"/"}>Home</Link>
            </li>
            <li>
                <Link href={"/about"}>About Us</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar