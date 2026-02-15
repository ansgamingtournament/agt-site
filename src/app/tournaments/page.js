'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/styles/TournamentList.module.css';
import TournamentCard from '@/app/components/TournamentCard';
import { TOURNAMENT_STATUS } from "@/app/constants/TournamentStatus";

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
                    <h1>Sekcja Turniejów</h1>
                    <p>
                        Dołącz do uczelnianych turniejów - sprawdź trwające rozgrywki, zaplanowane wydarzenia i archiwalne wyniki.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <div className={styles.page}>
                {/* TABS */}
                <div className={styles.tabs}>
                    {Object.entries(TOURNAMENT_STATUS).map(([key, status]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`${styles.tab} ${
                                activeTab === key ? styles.active : ''
                            }`}
                        >
                            {status.label}
                        </button>
                    ))}

                </div>

                {/* GRID */}
                <div className={styles.grid}>
                    {filtered.length === 0 && (
                        <p className={styles.empty}>Brak turniejów w danej kategorii.</p>
                    )}

                    {filtered.map(t => (
                        <TournamentCard key={t.id} tournament={t} />
                    ))}
                </div>
            </div>
        </>
    );
}
