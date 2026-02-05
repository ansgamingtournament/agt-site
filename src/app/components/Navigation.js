'use client';

import Link from 'next/link';
import styles from '@/app/styles/Navigation.module.css';
import { useAdmin } from "@/app/context/AdminContext";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
    const { isAdmin } = useAdmin();
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>

                <Link href="/" onClick={closeMenu}>
                    <Image src={"/logo.png"} alt={"Logo"} width={100} height={72}/>
                </Link>

                {/* Desktop links */}
                <div className={styles.links}>
                    <NavLink href="/" closeMenu={closeMenu}>Home</NavLink>
                    <NavLink href="/tournaments" closeMenu={closeMenu}>Tournaments</NavLink>
                    {isAdmin && (
                        <NavLink href="/admin" closeMenu={closeMenu}>Admin</NavLink>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className={styles.menuBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
            {menuOpen && (
                <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
                    <NavLink href="/" closeMenu={closeMenu}>Home</NavLink>
                    <NavLink href="/tournaments" closeMenu={closeMenu}>Tournaments</NavLink>
                    {isAdmin && (
                        <NavLink href="/admin" closeMenu={closeMenu}>Admin</NavLink>
                    )}
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children, closeMenu }) {
    return (
        <Link href={href} className={styles.link} onClick={closeMenu}>
            {children}
        </Link>
    );
}
