import MatchCard from './MatchCard';
import styles from '@/app/styles/TournamentBracket.module.css';

export default function BracketColumn({ title, matches, onMatchClick, className }) {
    return (
        <div>
            <div className={styles.title}>
                <h3>{title}</h3>
            </div>
            <div className={`${styles.bracketColumn} ${className || ""}`}>
                {matches.map(match => (
                    <MatchCard
                        key={`${match.side}-${match.round_number}-${match.bracket_position}`}
                        match={match}
                        onClick={onMatchClick}
                    />
                ))}
            </div>
        </div>
    );
}
