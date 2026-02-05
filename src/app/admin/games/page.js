'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/styles/Admin.module.css';

export default function GamesAdmin() {
    const [games, setGames] = useState([]);

    const [addForm, setAddForm] = useState({ name: '', image_url: '' });

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const [search, setSearch] = useState('');

    const filtered = games.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    async function load() {
        const res = await fetch('/api/admin/game');
        setGames(await res.json());
    }

    useEffect(() => { load(); }, []);

    // ---------- ADD ----------
    async function addGame() {
        await fetch('/api/admin/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addForm)
        });

        setAddForm({ name: '', image_url: '' });
        load();
    }

    // ---------- SAVE EDIT ----------
    async function saveEdit() {
        await fetch('/api/admin/game', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editForm, id: editId })
        });

        setEditId(null);
        setEditForm({});
        load();
    }

    async function del(id) {
        if (!confirm('Delete game?')) return;
        await fetch(`/api/admin/game?id=${id}`, { method: 'DELETE' });
        load();
    }

    return (
        <>
            <div className={styles["admin-form"]}>
                <label>Name</label>
                <input
                    value={addForm.name}
                    onChange={e =>
                        setAddForm({ ...addForm, name: e.target.value })
                    }
                />

                <label>Image URL</label>
                <input
                    value={addForm.image_url}
                    onChange={e =>
                        setAddForm({
                            ...addForm,
                            image_url: e.target.value
                        })
                    }
                />

                <button
                    className={styles["btn-save"]}
                    onClick={addGame}
                >
                    Add Game
                </button>
            </div>

            <input
                className={styles["admin-search"]}
                placeholder="Search"
                onChange={e => setSearch(e.target.value)}
            />


            <table className={styles["admin-table"]}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {filtered.map(g => {
                    const isEditing = editId === g.id;

                    return (
                        <tr key={g.id}>
                            <td>{g.id}</td>

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
                                    g.name
                                )}
                            </td>

                            {/* IMAGE */}
                            <td>
                                {isEditing ? (
                                    <input
                                        value={editForm.image_url}
                                        onChange={e =>
                                            setEditForm({
                                                ...editForm,
                                                image_url: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <img
                                        src={g.image_url}
                                        className={styles["admin-image"]}
                                    />
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
                                                    setEditId(g.id);
                                                    setEditForm(g);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className={`${styles.btn} ${styles["btn-delete"]}`}
                                                onClick={() => del(g.id)}
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
        </>
    );
}
