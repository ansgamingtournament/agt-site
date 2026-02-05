'use client';

import Link from 'next/link';
import styles from '@/app/styles/Navigation.module.css';
import {useAdmin} from "@/app/context/AdminContext";
import Image from "next/image";

export default function Navigation() {
    const { isAdmin } = useAdmin();
    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link href="/">
                    <Image src={"/logo.png"} alt={"Logo"} width={100} height={72}/>
                </Link>

                <div className={styles.links}>
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/tournaments">Tournaments</NavLink>
                    {isAdmin && (<NavLink href="/admin">Admin</NavLink>)}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <Link href={href} className={styles.link}>
            {children}
        </Link>
    );
}
