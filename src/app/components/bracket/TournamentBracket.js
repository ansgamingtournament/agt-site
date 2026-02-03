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
                    {/* LEFT SIDE */}
                    <BracketColumn title="Round of 16" matches={b.left.r16} onMatchClick={setActiveMatch} />
                    <BracketColumn title="Quarterfinals" matches={b.left.r8} onMatchClick={setActiveMatch} className={styles.round8}/>
                    <BracketColumn title="Round of 4" matches={b.left.r4} onMatchClick={setActiveMatch} className={styles.round4} />

                    {/* CENTER */}
                    <div className={styles.centerBracket}>
                        <BracketColumn title="Semifinal" matches={b.left.semifinal} onMatchClick={setActiveMatch} className={styles.semifinal}/>

                        <div className={styles.final}>
                            <div className={styles.title}>
                                <h3>Final</h3>
                            </div>

                            {b.final && <MatchCard match={b.final} onClick={setActiveMatch} />}
                        </div>

                        <BracketColumn title="Semifinal" matches={b.right.semifinal} onMatchClick={setActiveMatch} className={styles.semifinal}/>
                    </div>

                    {/* RIGHT SIDE */}
                    <BracketColumn title="Round of 4" matches={b.right.r4} onMatchClick={setActiveMatch} className={styles.round4}/>
                    <BracketColumn title="Quarterfinals" matches={b.right.r8} onMatchClick={setActiveMatch} className={styles.round8}/>
                    <BracketColumn title="Round of 16" matches={b.right.r16} onMatchClick={setActiveMatch} />
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
