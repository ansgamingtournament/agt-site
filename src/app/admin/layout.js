'use client';

import Link from 'next/link';
import { useAdmin } from "@/app/context/AdminContext";
import styles from '@/app/styles/Admin.module.css';
import { useState } from "react";

export default function AdminLayout({ children }) {
    const { isAdmin } = useAdmin();
    const [open, setOpen] = useState(false);

    if (!isAdmin) {
        return <div className={styles["admin-page"]}>Access denied</div>;
    }

    function toggleSidebar() {
        setOpen(prev => !prev);
    }

    function closeSidebar() {
        setOpen(false);
    }

    return (
        <div className={styles["admin-shell"]}>

            {/* overlay */}
            {open && (
                <div
                    className={styles.overlay}
                    onClick={closeSidebar}
                />
            )}

            {/* sidebar */}
            <aside className={`${styles["admin-sidebar"]} ${open ? styles.open : ''}`}>
                <nav className={styles["admin-nav"]}>
                    <Link href="/admin" onClick={closeSidebar}>Dashboard</Link>
                    <Link href="/admin/teams" onClick={closeSidebar}>Teams</Link>
                    <Link href="/admin/games" onClick={closeSidebar}>Games</Link>
                    <Link href="/admin/tournaments" onClick={closeSidebar}>Tournaments</Link>
                    <Link href="/admin/stages" onClick={closeSidebar}>Stages</Link>
                </nav>
            </aside>

            {/* centered left toggle */}
            <button
                className={`${styles.sidebarHandle} ${open ? styles.handleOpen : ''}`}
                onClick={toggleSidebar}
            >
                {open ? "‹" : "›"}
            </button>

            {/* content */}
            <main className={styles["admin-content"]}>
                {children}
            </main>

        </div>
    );
}
