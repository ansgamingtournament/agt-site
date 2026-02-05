'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/styles/TournamentList.module.css';
import TournamentCard from '@/app/components/TournamentCard';

const TABS = [
    { key: 'CURRENT', label: 'Live' },
    { key: 'FUTURE', label: 'Upcoming' },
    { key: 'OVER', label: 'Finished' },
];

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState([]);
    const [activeTab, setActiveTab] = useState('CURRENT');

    useEffect(() => {
        fetch('/api/tournaments')
            .then(res => res.json())
            .then(setTournaments);
    }, []);

    const filtered = tournaments.filter(t => t.status === activeTab);

    return (
        <>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Tournaments</h1>
                    <p>
                        Explore live competitions, upcoming events, and completed tournaments
                        across multiple games.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <div className={styles.page}>
                {/* TABS */}
                <div className={styles.tabs}>
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`${styles.tab} ${
                                activeTab === tab.key ? styles.active : ''
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* GRID */}
                <div className={styles.grid}>
                    {filtered.length === 0 && (
                        <p className={styles.empty}>No tournaments found.</p>
                    )}

                    {filtered.map(t => (
                        <TournamentCard key={t.id} tournament={t} />
                    ))}
                </div>
            </div>
        </>
    );
}
