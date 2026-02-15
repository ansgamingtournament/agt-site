'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/styles/Admin.module.css';

function toInputDateTime(sqlDate) {
    if (!sqlDate) return '';
    return new Date(sqlDate).toISOString().slice(0, 16);
}

export default function TournamentsAdmin() {
    const [items, setItems] = useState([]);
    const [games, setGames] = useState([]);

    const [addForm, setAddForm] = useState({
        game_id: '',
        start_date: '',
        end_date: '',
        form_url: ''
    });

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});

    async function load() {
        setItems(await (await fetch('/api/admin/tournament')).json());
        setGames(await (await fetch('/api/admin/game')).json());
    }

    useEffect(() => { load(); }, []);

    // -------- ADD --------
    async function addTournament() {
        await fetch('/api/admin/tournament', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addForm)
        });

        setAddForm({ game_id: '', start_date: '', end_date: '', form_url: '' });
        load();
    }

    // -------- SAVE EDIT --------
    async function saveEdit() {
        await fetch('/api/admin/tournament', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editForm, id: editId })
        });

        setEditId(null);
        setEditForm({});
        load();
    }

    async function del(id) {
        if (!confirm('Delete tournament?')) return;
        await fetch(`/api/admin/tournament?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <div className={styles["admin-form"]}>
                <label>Game</label>
                <select
                    value={addForm.game_id}
                    onChange={e =>
                        setAddForm({ ...addForm, game_id: e.target.value })
                    }
                >
                    <option value="">Select game</option>
                    {games.map(g => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <label>Start</label>
                <input
                    type="datetime-local"
                    value={addForm.start_date}
                    onChange={e =>
                        setAddForm({
                            ...addForm,
                            start_date: e.target.value
                        })
                    }
                />

                <label>End</label>
                <input
                    type="datetime-local"
                    value={addForm.end_date}
                    onChange={e =>
                        setAddForm({
                            ...addForm,
                            end_date: e.target.value
                        })
                    }
                />

                <button
                    className={styles["btn-save"]}
                    onClick={addTournament}
                >
                    Add Tournament
                </button>
            </div>

            <table className={styles["admin-table"]}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Game</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Registration Form</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {items.map(t => {
                    const isEditing = editId === t.id;

                    return (
                        <tr key={t.id}>
                            <td>{t.id}</td>

                            {/* GAME */}
                            <td>
                                {isEditing ? (
                                    <select
                                        value={editForm.game_id}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                game_id: e.target.value
                                            })
                                        }
                                    >
                                        {games.map(g => (
                                            <option key={g.id} value={g.id}>
                                                {g.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    t.game_id
                                )}
                            </td>

                            {/* START */}
                            <td>
                                {isEditing ? (
                                    <input
                                        type="datetime-local"
                                        value={editForm.start_date}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                start_date: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    toInputDateTime(t.start_date)
                                )}
                            </td>

                            {/* END */}
                            <td>
                                {isEditing ? (
                                    <input
                                        type="datetime-local"
                                        value={editForm.end_date}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                end_date: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    toInputDateTime(t.end_date)
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        value={editForm.form_url}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                form_url: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    t.form_url
                                )}
                            </td>
                            {/* ACTIONS */}
                            <td>
                                <span className={styles["admin-actions"]}>
                                    {isEditing ? (
                                        <>
                                            <button
                                                className={`${styles.btn} ${styles["btn-edit"]}`}
                                                onClick={saveEdit}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={`${styles.btn} ${styles["btn-delete"]}`}
                                                onClick={() => setEditId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className={`${styles.btn} ${styles["btn-edit"]}`}
                                                onClick={() => {
                                                    setEditId(t.id);
                                                    setEditForm({
                                                        game_id: t.game_id,
                                                        start_date: toInputDateTime(t.start_date),
                                                        end_date: toInputDateTime(t.end_date),
                                                        form_url: t.form_url,
                                                    });
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className={`${styles.btn} ${styles["btn-delete"]}`}
                                                onClick={() => del(t.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
