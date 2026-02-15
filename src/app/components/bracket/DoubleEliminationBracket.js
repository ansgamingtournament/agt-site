import { useState } from "react";
import MatchCard from "./MatchCard";
import MatchGameModal from "./MatchGameModal";
import { groupDoubleEliminationMatches } from "@/app/lib/bracket";
import styles from "@/app/styles/DoubleElim.module.css";

export default function DoubleEliminationBracket({ tournamentID, matches, teams }) {
    const b = groupDoubleEliminationMatches(matches);
    const [activeMatch, setActiveMatch] = useState(null);

    async function saveMatch(data) {
        const method = data.id ? "PUT" : "POST";

        await fetch("/api/matchgame", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        setActiveMatch(null);
        window.location.reload();
    }

    const renderColumn = (matches, extraClass, keyPrefix) => (
        <div className={`${styles.column} ${extraClass}`}>
            {matches.map((m, i) => (
                <div
                    key={`${keyPrefix}-${m.bracket_position}`}
                    className={styles.matchWrapper}
                    data-index={i}
                >
                    <MatchCard match={m} onClick={setActiveMatch} />
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className={styles.bracketScroll}>
                <div className={styles.bracketGrid}>

                    {/* ================= UPPER BRACKET ================= */}

                    {renderColumn(b.upper.r1, styles.ub, "ub1")}

                    {renderColumn(
                        b.upper.r2,
                        `${styles.ub} ${styles["round2-upper"]}`,
                        "ub2"
                    )}

                    {renderColumn(
                        b.upper.final,
                        `${styles.ub} ${styles["round3-upper"]}`,
                        "ub3"
                    )}

                    {/* ================= LOWER BRACKET ================= */}

                    {renderColumn(b.lower.r1, styles.lb, "lb1")}

                    {renderColumn(
                        b.lower.r2,
                        `${styles.lb} ${styles["round2-lower"]}`,
                        "lb2"
                    )}

                    {renderColumn(
                        b.lower.r3,
                        `${styles.lb} ${styles["round3-lower"]}`,
                        "lb3"
                    )}

                    {renderColumn(
                        b.lower.final,
                        `${styles.lb} ${styles["round4-lower"]}`,
                        "lb4"
                    )}

                    {/* ================= GRAND FINAL ================= */}

                    <div className={styles.grandFinal}>
                        <div className={styles.matchWrapper}>
                            <MatchCard
                                match={b.grandFinal}
                                onClick={setActiveMatch}
                            />
                        </div>
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
