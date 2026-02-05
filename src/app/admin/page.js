"use client";
import Link from 'next/link';
import { useAdmin } from "@/app/context/AdminContext";
import styles from '@/app/styles/Admin.module.css';

export default function AdminPage() {
    return (
        <>
            <h2>Admin Dashboard</h2>
            <p>Select a section from the sidebar.</p>
        </>
    );
}
