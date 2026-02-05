import styles from '@/app/styles/TournamentCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function TournamentCard({ tournament }) {
    return (
        <Link href={`/tournaments/${tournament.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={tournament.game_image}
                        alt={tournament.game_name}
                        fill
                        className={styles.image}
                        unoptimized
                    />
                </div>

                <div className={styles.content}>
                    <h3>{tournament.game_name}</h3>

                    <p>
                        {new Date(tournament.start_date).toLocaleDateString()} –{' '}
                        {new Date(tournament.end_date).toLocaleDateString()}
                    </p>

                    {tournament.status === 'OVER' && tournament.winner_name && (
                        <span className={styles.winner}>
                            Winner: {tournament.winner_name}
                        </span>
                    )}

                    <span className={`${styles.badge} ${styles[tournament.status]}`}>
                        {tournament.status}
                    </span>
                </div>
            </div>
        </Link>
    );
}
