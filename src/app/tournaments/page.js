'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/styles/TournamentList.module.css';
import TournamentCard from '@/app/components/TournamentCard';

const TABS = ['CURRENT', 'FUTURE', 'OVER'];

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
        <div className={styles.wrapper}>
            <h1>Tournaments</h1>

            {/* Tabs */}
            <div className={styles.tabs}>
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'OVER' && 'Over Tournaments'}
                        {tab === 'CURRENT' && 'Current Tournaments'}
                        {tab === 'FUTURE' && 'Future Tournaments'}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {filtered.map(t => (
                    <TournamentCard key={t.id} tournament={t} />
                ))}

                {filtered.length === 0 && (
                    <p className={styles.empty}>No tournaments found.</p>
                )}
            </div>
        </div>
    );
}
