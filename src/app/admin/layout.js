'use client';

import Link from 'next/link';
import { useAdmin } from "@/app/context/AdminContext";
import styles from '@/app/styles/Admin.module.css';

export default function AdminLayout({ children }) {
    const { isAdmin } = useAdmin();

    if (!isAdmin) {
        return (
            <div className={styles["admin-page"]}>
                Access denied
            </div>
        );
    }

    return (
        <div className={styles["admin-shell"]}>
            <aside className={styles["admin-sidebar"]}>
                <nav className={styles["admin-nav"]}>
                    <Link href="/admin">Dashboard</Link>
                    <Link href="/admin/teams">Teams</Link>
                    <Link href="/admin/games">Games</Link>
                    <Link href="/admin/tournaments">Tournaments</Link>
                    <Link href="/admin/stages">Stages</Link>
                </nav>
            </aside>

            {/* Dynamic page */}
            <main className={styles["admin-content"]}>
                {children}
            </main>

        </div>
    );
}
