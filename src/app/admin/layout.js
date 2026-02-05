'use client';

import Link from 'next/link';
import { useAdmin } from "@/app/context/AdminContext";
import styles from '@/app/styles/Admin.module.css';
import { useRef, useState } from "react";

const SIDEBAR_WIDTH = 240;

export default function AdminLayout({ children }) {
    const { isAdmin } = useAdmin();

    const [open, setOpen] = useState(false);
    const [dragX, setDragX] = useState(0);

    const startX = useRef(0);
    const dragging = useRef(false);

    if (!isAdmin) {
        return <div className={styles["admin-page"]}>Access denied</div>;
    }

    function onPointerDown(e) {
        const x = e.clientX;

        // allow swipe from edge OR from open sidebar
        if (!open && x > 30) return;

        dragging.current = true;
        startX.current = x;
    }

    function onPointerMove(e) {
        if (!dragging.current) return;

        const delta = e.clientX - startX.current;

        let offset = open
            ? Math.min(0, delta)
            : Math.max(0, Math.min(SIDEBAR_WIDTH, delta));

        setDragX(offset);
    }

    function onPointerUp() {
        if (!dragging.current) return;

        dragging.current = false;

        // snap logic
        if (!open && dragX > SIDEBAR_WIDTH * 0.4) setOpen(true);
        if (open && dragX < -SIDEBAR_WIDTH * 0.4) setOpen(false);

        setDragX(0);
    }

    const translate = open
        ? dragX
        : -SIDEBAR_WIDTH + dragX;

    function toggleSidebar() {
        dragging.current = false;
        setDragX(0);
        setOpen(prev => !prev);
    }

    return (
        <div
            className={styles["admin-shell"]}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >

            {/* Sidebar */}
            <aside
                className={styles["admin-sidebar"]}
                style={{
                    transform: `translateX(${translate}px)`,
                    transition: dragging.current
                        ? 'none'
                        : 'transform 0.25s ease'
                }}
            >
                <nav className={styles["admin-nav"]}>
                    <Link href="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
                    <Link href="/admin/teams" onClick={() => setOpen(false)}>Teams</Link>
                    <Link href="/admin/games" onClick={() => setOpen(false)}>Games</Link>
                    <Link href="/admin/tournaments" onClick={() => setOpen(false)}>Tournaments</Link>
                    <Link href="/admin/stages" onClick={() => setOpen(false)}>Stages</Link>
                </nav>
            </aside>

            {/* Edge arrow toggle */}
            <div
                className={`${styles.edgeHint} ${open ? styles.edgeOpen : ''}`}
                onClick={toggleSidebar}
            />

            {/* Main content */}
            <main className={styles["admin-content"]}>
                {children}
            </main>

        </div>
    );
}
