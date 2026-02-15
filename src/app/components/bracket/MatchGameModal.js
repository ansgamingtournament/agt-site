import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/styles/MatchGameModal.module.css';

export default function MatchGameModal({ tournamentID, match, teams, onClose, onSave }) {
    const isNew = match.id == null;

    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);

    const [teamAQuery, setTeamAQuery] = useState('');
    const [teamBQuery, setTeamBQuery] = useState('');

    const [teamAResult, setTeamAResult] = useState('');
    const [teamBResult, setTeamBResult] = useState('');

    const [winner, setWinner] = useState('');
    const [date, setDate] = useState('');

    /* ---------- INIT ---------- */

    useEffect(() => {
        setTeamA(match.team_a_id ?? null);
        setTeamB(match.team_b_id ?? null);
        setWinner(match.winner_id ?? '');
        setTeamAResult(match.team_a_result ?? '');
        setTeamBResult(match.team_b_result ?? '');

        if (match.start_date) {
            setDate(new Date(match.start_date).toISOString().slice(0, 16));
        } else {
            setDate('');
        }

        const a = teams?.find(t => t.id === match.team_a_id);
        const b = teams?.find(t => t.id === match.team_b_id);

        setTeamAQuery(a?.name ?? '');
        setTeamBQuery(b?.name ?? '');
    }, [match, teams]);

    /* ---------- FILTERING ---------- */

    const filteredTeamsA = useMemo(() => {
        if (!teamAQuery) return [];
        return teams.filter(t =>
            t.name.toLowerCase().startsWith(teamAQuery.toLowerCase())
        );
    }, [teamAQuery, teams]);

    const filteredTeamsB = useMemo(() => {
        if (!teamBQuery) return [];
        return teams.filter(t =>
            t.name.toLowerCase().startsWith(teamBQuery.toLowerCase())
        );
    }, [teamBQuery, teams]);

    /* ---------- VALIDATION ---------- */

    useEffect(() => {
        if (winner && winner !== teamA && winner !== teamB) {
            setWinner('');
        }
    }, [teamA, teamB]);

    /* ---------- SUBMIT ---------- */

    function submit() {
        onSave({
            id: match.id ?? null,
            stage_id: tournamentID,
            round_number: match.round_number,
            bracket_position: match.bracket_position,
            team_a_id: teamA,
            team_b_id: teamB,
            winner_id: winner || null,
            start_date: date || null,
            team_a_result: teamAResult || null,
            team_b_result: teamBResult || null
        });
    }

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>

                <h3>
                    {isNew ? 'Create Match' : 'Edit Match'}
                    <small>
                        Round {match.round_number} · Position {match.bracket_position}
                    </small>
                </h3>

                {/* TEAM A */}
                <div className={styles.field}>
                    <label>Team A</label>
                    <input
                        value={teamAQuery}
                        onChange={e => {
                            setTeamAQuery(e.target.value);
                            setTeamA(null);
                        }}
                        placeholder="Start typing team name…"
                    />
                    {!teamA && teamAQuery && filteredTeamsA.length > 0 && (
                        <div className={styles.dropdown}>
                            {filteredTeamsA.map(t => (
                                <div
                                    key={t.id}
                                    className={styles.option}
                                    onClick={() => {
                                        setTeamA(t.id);
                                        setTeamAQuery(t.name);
                                    }}
                                >
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.inline}>
                    <label>Result</label>
                    <input
                        type="number"
                        value={teamAResult}
                        onChange={e => setTeamAResult(e.target.value)}
                    />
                </div>

                {/* TEAM B */}
                <div className={styles.field}>
                    <label>Team B</label>
                    <input
                        value={teamBQuery}
                        onChange={e => {
                            setTeamBQuery(e.target.value);
                            setTeamB(null);
                        }}
                        placeholder="Start typing team name…"
                    />
                    {!teamB && teamBQuery && filteredTeamsB.length > 0 && (
                        <div className={styles.dropdown}>
                            {filteredTeamsB.map(t => (
                                <div
                                    key={t.id}
                                    className={styles.option}
                                    onClick={() => {
                                        setTeamB(t.id);
                                        setTeamBQuery(t.name);
                                    }}
                                >
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.inline}>
                    <label>Result</label>
                    <input
                        type="number"
                        value={teamBResult}
                        onChange={e => setTeamBResult(e.target.value)}
                    />
                </div>

                {/* WINNER */}
                <label>
                    Winner
                    <select value={winner} onChange={e => setWinner(e.target.value)}>
                        <option value="">—</option>
                        {teamA && <option value={teamA}>Team A</option>}
                        {teamB && <option value={teamB}>Team B</option>}
                    </select>
                </label>

                <label>
                    Match date
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>

                <div className={styles.actions}>
                    <button className={styles.save} onClick={submit}>Save</button>
                    <button className={styles.cancel} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
