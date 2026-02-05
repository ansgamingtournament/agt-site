import MatchCard from './MatchCard';
import MatchGameModal from './MatchGameModal';
import { groupMatches } from "@/app/lib/bracket";
import BracketColumn from "@/app/components/bracket/BracketColumn";
import styles from "@/app/styles/TournamentBracket.module.css";
import {useState} from "react";

export default function TournamentBracket({tournamentID, matches, teams }) {
    const b = groupMatches(matches);
    const [activeMatch, setActiveMatch] = useState(null);

    async function saveMatch(data) {
        const method = data.id ? 'PUT' : 'POST';

        await fetch('/api/matchgame', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        setActiveMatch(null);

        window.location.reload(); // TODO: temporary
    }

    return (
        <>
            <div className={styles.bracketScroll}>
                <div className={styles.bracketContainer}>
                    <BracketColumn title="Round 1" matches={b.left.r16} onMatchClick={setActiveMatch} />
                    <BracketColumn title="Round 2" matches={b.left.r8} onMatchClick={setActiveMatch} className={styles.round8}/>
                    <BracketColumn title="Round 3" matches={b.left.r4} onMatchClick={setActiveMatch} className={styles.round4} />
                    <div className={styles.final}>
                        <div className={styles.title}>
                            <h3>Final</h3>
                        </div>
                        {b.final && <MatchCard match={b.final} onClick={setActiveMatch} />}
                    </div>
                </div>
            </div>
            {activeMatch && (
                <MatchGameModal
                    tournamentID={tournamentID}
                    match={activeMatch}
                    teams={teams}
                    onClose={() => setActiveMatch(null)}
                    onSave={saveMatch}
                />
            )}
        </>
    );
}
