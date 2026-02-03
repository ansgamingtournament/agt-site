"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/TeamList.module.css';

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch('/api/teams/get-teams');
                const data = await res.json();
                setTeams(data);
            } catch (err) {
                console.error('Failed to fetch teams', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTeams();
    }, []);

    if (loading) {
        return <p>Loading teams...</p>;
    }

    return (
        <div className={styles.grid}>
            {teams.map(team => (
                <Link
                    key={team.id}
                    href={`/teams/${team.id}`}
                    className={styles.card}
                >
                    <img
                        src={team.image_url}
                        alt={team.name}
                        className={styles.image}
                    />
                    <h3>{team.name}</h3>
                </Link>
            ))}
        </div>
    );
}
