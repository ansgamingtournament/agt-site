import Link from 'next/link';
import styles from '@/app/styles/TournamentList.module.css';

export default function TournamentCard({ tournament }) {
    return (
        <Link href={`/tournaments/${tournament.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <img
                    src={tournament.game_image}
                    alt={tournament.game_name}
                    className={styles.gameImage}
                />

                <div className={styles.cardBody}>
                    <h3>{tournament.game_name}</h3>

                    <p>
                        <strong>Start:</strong>{' '}
                        {new Date(tournament.start_date).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>End:</strong>{' '}
                        {new Date(tournament.end_date).toLocaleDateString()}
                    </p>

                    {tournament.status === 'OVER' && (
                        <p className={styles.winner}>
                            🏆 Winner: {tournament.winner_name ?? 'TBD'}
                        </p>
                    )}

                    <span
                        className={`${styles.badge} ${
                            styles[tournament.status.toLowerCase()]
                        }`}
                    >
                        {tournament.status}
                    </span>
                </div>
            </div>
        </Link>
    );
}
