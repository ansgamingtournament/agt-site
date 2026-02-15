'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/styles/Admin.module.css';

export default function StagesAdmin() {
    const [items, setItems] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    const [addForm, setAddForm] = useState({
        tournament_id: '',
        name: '',
        stage_type: 'GROUP',
        order_index: ''
    });

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});

    async function load() {
        setItems(await (await fetch('/api/admin/stage')).json());
        setTournaments(await (await fetch('/api/admin/tournament')).json());
    }

    useEffect(() => { load(); }, []);

    // -------- ADD --------
    async function addStage() {
        await fetch('/api/admin/stage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addForm)
        });

        setAddForm({
            tournament_id: '',
            name: '',
            stage_type: 'GROUP',
            order_index: ''
        });

        load();
    }

    // -------- SAVE EDIT --------
    async function saveEdit() {
        await fetch('/api/admin/stage', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editForm, id: editId })
        });

        setEditId(null);
        setEditForm({});
        load();
    }

    async function del(id) {
        if (!confirm('Delete stage?')) return;
        await fetch(`/api/admin/stage?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <div>
            <div className={styles["admin-form"]}>
                <div className={styles.field}>
                    <label>Tournament</label>
                    <select
                        value={addForm.tournament_id}
                        onChange={e =>
                            setAddForm({
                                ...addForm,
                                tournament_id: e.target.value
                            })
                        }
                    >
                        <option value="">Select tournament</option>
                        {tournaments.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Name</label>
                    <input
                        value={addForm.name}
                        onChange={e =>
                            setAddForm({ ...addForm, name: e.target.value })
                        }
                    />
                </div>

                <div className={styles.field}>
                    <label>Type</label>
                    <select
                        value={addForm.stage_type}
                        onChange={e =>
                            setAddForm({
                                ...addForm,
                                stage_type: e.target.value
                            })
                        }
                    >
                        <option value="GROUP">GROUP</option>
                        <option value="BRACKET">BRACKET</option>
                        <option value="SWISS">SWISS</option>
                        <option value="DOUBLE">Double</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>Order</label>
                    <input
                        type="number"
                        value={addForm.order_index}
                        onChange={e =>
                            setAddForm({
                                ...addForm,
                                order_index: e.target.value
                            })
                        }
                    />
                </div>

                <button
                    className={styles["btn-save"]}
                    onClick={addStage}
                >
                    Add Stage
                </button>

            </div>

            <table className={styles["admin-table"]}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tournament</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Order</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {items.map(s => {
                    const isEditing = editId === s.id;

                    return (
                        <tr key={s.id}>
                            <td>{s.id}</td>

                            {/* TOURNAMENT */}
                            <td>
                                {isEditing ? (
                                    <select
                                        value={editForm.tournament_id}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                tournament_id: e.target.value
                                            })
                                        }
                                    >
                                        {tournaments.map(t => (
                                            <option key={t.id} value={t.id}>
                                                {t.id}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    s.tournament_id
                                )}
                            </td>

                            {/* NAME */}
                            <td>
                                {isEditing ? (
                                    <input
                                        value={editForm.name}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                name: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    s.name
                                )}
                            </td>

                            {/* TYPE */}
                            <td>
                                {isEditing ? (
                                    <select
                                        value={editForm.stage_type}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                stage_type: e.target.value
                                            })
                                        }
                                    >
                                        <option value="GROUP">GROUP</option>
                                        <option value="BRACKET">BRACKET</option>
                                        <option value="SWISS">SWISS</option>
                                        <option value="DOUBLE">Double</option>
                                    </select>
                                ) : (
                                    s.stage_type
                                )}
                            </td>

                            {/* ORDER */}
                            <td>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editForm.order_index}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                order_index: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    s.order_index
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
                                                    setEditId(s.id);
                                                    setEditForm({
                                                        tournament_id: s.tournament_id,
                                                        name: s.name,
                                                        stage_type: s.stage_type,
                                                        order_index: s.order_index
                                                    });
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className={`${styles.btn} ${styles["btn-delete"]}`}
                                                onClick={() => del(s.id)}
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
