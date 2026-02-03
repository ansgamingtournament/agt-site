import styles from '@/app/styles/TournamentBracket.module.css';

export default function MatchCard({ match, onClick }) {
    return (
        <div className={styles.match} onClick={() => onClick(match)}>
            {match.id === null && (
                <div className={styles.addMatch}>+</div>
            )}

            <TeamRow
                team={match.team_a_name}
                img={match.team_a_image}
                winner={match.winner_id === match.team_a_id}
            />
            <TeamRow
                team={match.team_b_name}
                img={match.team_b_image}
                winner={match.winner_id === match.team_b_id}
            />

            {match.start_date ?
                <div className={styles.matchDate}>
                    {formatDate(match.start_date)}
                </div>
             :
                <div className={styles.matchDate}>
                    tbd
                </div>
            }
        </div>
    );
}

function formatDate(dateString) {
    if (!dateString) return '';

    const d = new Date(dateString);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function TeamRow({ team, img, winner }) {
    return (
        <div className={`${styles.team} ${winner ? styles.winner : ''}`}>
            {img && <img src={img} alt={team} />}
            <span>{team ?? 'TBD'}</span>
            <span>{winner ? winner : ''}</span>
        </div>
    );
}
