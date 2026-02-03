import { useEffect, useState } from 'react';
import styles from '@/app/styles/MatchGameModal.module.css';

export default function MatchGameModal({ tournamentID, match, teams, onClose, onSave }) {
    const isNew = match.id == null;

    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [winner, setWinner] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (winner && winner !== teamA && winner !== teamB) {
            setWinner('');
        }
    }, [teamA, teamB]);


    useEffect(() => {
        setTeamA(match.team_a_id ?? '');
        setTeamB(match.team_b_id ?? '');
        setWinner(match.winner_id ?? '');

        if (match.start_date) {
            const formatted = new Date(match.start_date)
                .toISOString()
                .slice(0, 16);
            setDate(formatted);
        } else {
            setDate('');
        }
    }, [match]);

    function submit() {
        onSave({
            id: match.id ?? null,
            stage_id: tournamentID,
            round_number: match.round_number,
            bracket_position: match.bracket_position,
            team_a_id: teamA || null,
            team_b_id: teamB || null,
            winner_id: winner || null,
            start_date: date || null
        });
    }


    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
            >
                <h3>
                    {isNew ? 'Create Match' : 'Edit Match'}<br />
                    <small>
                        Round {match.round_number} – Position {match.bracket_position}
                    </small>
                </h3>


                <label>
                    Team A
                    <select value={teamA} onChange={e => setTeamA(e.target.value)}>
                        <option value="">—</option>
                        {teams?.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Team B
                    <select value={teamB} onChange={e => setTeamB(e.target.value)}>
                        <option value="">—</option>
                        {teams?.map(t => (
                            <option
                                key={t.id}
                                value={t.id}
                                disabled={String(t.id) === String(teamA)}
                            >
                                {t.name}
                            </option>
                        ))}
                    </select>

                </label>

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
