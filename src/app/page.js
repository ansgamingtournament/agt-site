'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/styles/Home.module.css';
import TournamentCard from '@/app/components/TournamentCard';
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        fetch('/api/tournaments')
            .then(res => res.json())
            .then(setTournaments);
    }, []);

    const current = tournaments.filter(t => t.status === 'CURRENT');
    const future = tournaments.filter(t => t.status === 'FUTURE');
    const over = tournaments.filter(t => t.status === 'OVER');

    const featured = current[0] || future[0];

    return (
        <div className={styles.page}>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>

                    {/* Background logo */}
                    <div className={styles.heroLogo}>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={1000}
                            height={400}
                            priority
                        />
                    </div>

                    <h1>ANS GAMING TOURNAMENT</h1>
                    <p>Turnieje akademickie znajdziesz tutaj</p>

                    <Link href="/tournaments" className={styles.cta}>
                        Browse Tournaments
                    </Link>
                </div>
            </section>


            {/* STATS */}
            <section className={styles.stats}>
                <Stat label="Ongoing" value={current.length} />
                <Stat label="Upcoming" value={future.length} />
                <Stat label="Finished" value={over.length} />
            </section>

            {/* FEATURED */}
            {featured && (
                <section className={styles.featured}>
                    <h2>Featured Tournament</h2>
                    <TournamentCard tournament={featured} />
                </section>
            )}

            {/* SECTIONS */}
            <TournamentSection title="Live Now" data={current.slice(0, 4)} />
            <TournamentSection title="Coming Soon" data={future.slice(0, 4)} />
            <TournamentSection title="Recently Finished" data={over.slice(0, 4)} />
        </div>
    );
}

function TournamentSection({ title, data }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>{title}</h2>
                <Link href="/tournaments">View all</Link>
            </div>

            <div className={styles.grid}>
                {data.length === 0 && (
                    <p className={styles.empty}>No tournaments here yet.</p>
                )}
                {data.map(t => (
                    <TournamentCard key={t.id} tournament={t} />
                ))}
            </div>
        </section>
    );
}

function Stat({ label, value }) {
    return (
        <div className={styles.stat}>
            <span>{value}</span>
            <p>{label}</p>
        </div>
    );
}
