'use client';

import Link from 'next/link';
import styles from '@/app/styles/Navigation.module.css';
import { useAdmin } from "@/app/context/AdminContext";
import { FaDiscord, FaTwitch } from "react-icons/fa";
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
                    <NavLink href="/tournaments" closeMenu={closeMenu}>Turnieje</NavLink>
                    {isAdmin && (
                        <NavLink href="/admin" closeMenu={closeMenu}>Admin</NavLink>
                    )}

                    <DiscordButton />
                    <TwitchButton />
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
                    <NavLink href="/tournaments" closeMenu={closeMenu}>Turnieje</NavLink>
                    {isAdmin && (
                        <NavLink href="/admin" closeMenu={closeMenu}>Admin</NavLink>
                    )}
                    <DiscordButton mobile />
                    <TwitchButton mobile />
                </div>
            )}
        </nav>
    );
}

function TwitchButton({ mobile }) {
    return (
        <a
            href="https://www.twitch.tv/agt_ans"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.twitchBtn} ${mobile ? styles.mobileTwitch : ""}`}
        >
            <FaTwitch size={mobile ? 22 : 18} />
            {mobile && <span>Twitch</span>}
        </a>
    );
}


function DiscordButton({ mobile }) {
    return (
        <a
            href="https://discord.com/invite/yGPM6vFr"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.discordBtn} ${mobile ? styles.mobileDiscord : ""}`}
        >
            <FaDiscord size={mobile ? 22 : 18} />
            {mobile && <span>Discord</span>}
        </a>
    );
}

function NavLink({ href, children, closeMenu }) {
    return (
        <Link href={href} className={styles.link} onClick={closeMenu}>
            {children}
        </Link>
    );
}
