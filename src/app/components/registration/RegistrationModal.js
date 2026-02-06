"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import styles from "@/app/styles/Registration.module.css";

const emptyPlayer = {
    name: "",
    album: "",
    discord: "",
    link: "",
};

const placeholders = {
    name: "Imię i nazwisko",
    album: "Numer albumu",
    discord: "Discord (np. user#1234)",
    link: "Steam / OP.GG / Faceit",
};

export default function RegistrationModal({ isOpen, onClose }) {
    const [teamName, setTeamName] = useState("");
    const [leader, setLeader] = useState({ ...emptyPlayer });
    const [members, setMembers] = useState(
        Array.from({ length: 4 }, () => ({ ...emptyPlayer }))
    );
    const [loading, setLoading] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoBase64, setLogoBase64] = useState(null);

    if (!isOpen) return null;

    const updateMember = (index, field, value) => {
        const copy = [...members];
        copy[index][field] = value;
        setMembers(copy);
    };

    const generateExcelBase64 = () => {
        const rows = [
            ["Nazwa drużyny", teamName],
            [],
            ["LIDER"],
            ["Imię i nazwisko", "Numer albumu", "Discord ID", "OP.GG / Steam"],
            [leader.name, leader.album, leader.discord, leader.link],
            [],
            ["RESZTA ZESPOŁU"],
            ["Imię i nazwisko", "Numer albumu", "Discord ID", "OP.GG / Steam"],
            ...members.map(m => [m.name, m.album, m.discord, m.link]),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rejestracja");

        return XLSX.write(workbook, {
            bookType: "xlsx",
            type: "base64",
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!logoBase64) {
                alert("Dodaj logo drużyny");
                return;
            }

            const excelBase64 = generateExcelBase64();

            const res = await fetch("/api/registration-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    teamName,
                    excel: excelBase64,
                    logo: {
                        content: logoBase64,
                        filename: logoFile.name,
                        type: logoFile.type,
                    },
                }),
            });

            if (!res.ok) throw new Error("Failed");

            alert("Zgłoszenie wysłane!");
            onClose();
        } catch {
            alert("Błąd wysyłania formularza");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Rejestracja drużyny</h2>

                {/* TEAM NAME + LOGO */}
                <div className={styles.teamRow}>
                    <div className={styles.teamName}>
                        <label className={styles.label}>
                            Nazwa drużyny
                            <span className={styles.tooltip}>
                                ?
                                <span className={styles.tooltipText}>
                                    Nazwa drużyny powinna być odpowiednia i zgodna z zasadami wydarzenia. Wszystkie zgłoszenia są weryfikowane.
                                </span>
                            </span>
                        </label>
                        <input
                            placeholder="Nazwa drużyny"
                            value={teamName}
                            onChange={e => setTeamName(e.target.value)}
                        />
                    </div>

                    <div className={styles.teamLogo}>
                        <label className={styles.label}>
                            Logo drużyny
                            <span className={styles.tooltip}>
                                ?
                                <span className={styles.tooltipText}>
                                    Logo nie może przekraczać 1 MB. Najlepiej, aby miało proporcje 1:1 (np. 512 × 512)
                                </span>
                            </span>
                        </label>

                        {!logoFile ? (
                            <label className={styles.logoUpload}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        if (file.size > 1024 * 1024) {
                                            alert("Logo nie może przekraczać 1 MB");
                                            e.target.value = "";
                                            return;
                                        }

                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setLogoBase64(reader.result.split(",")[1]);
                                            setLogoFile({
                                                name: file.name,
                                                type: file.type,
                                                preview: reader.result,
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <span>Wybierz logo</span>
                            </label>
                        ) : (
                            <div className={styles.logoBigPreview}>
                                <img src={logoFile.preview} alt="Logo drużyny" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLogoFile(null);
                                        setLogoBase64(null);
                                    }}
                                >
                                    Zmień logo
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* LEADER */}
                <label className={styles.label}>
                    <h3>Lider</h3>
                    <span className={styles.tooltip}>
                        ?
                        <span className={styles.tooltipText}>
                            Lider jest osobą reprezentującą drużynę i głównym kontaktem w sprawach organizacyjnych.
                        </span>
                    </span>
                </label>

                <div className={styles.grid}>
                    {Object.keys(emptyPlayer).map(key => (
                        <input
                            key={key}
                            placeholder={placeholders[key]}
                            value={leader[key]}
                            onChange={e =>
                                setLeader({ ...leader, [key]: e.target.value })
                            }
                        />
                    ))}
                </div>

                {/* MEMBERS */}
                <h3>Reszta zespołu</h3>
                {members.map((member, i) => (
                    <div key={i} className={styles.playerBlock}>
                        <div className={styles.rowHeader}>
                            <span>Gracz {i + 2}</span>
                        </div>

                        <div className={styles.grid}>
                            {Object.keys(emptyPlayer).map(key => (
                                <input
                                    key={key}
                                    placeholder={placeholders[key]}
                                    value={member[key]}
                                    onChange={e =>
                                        updateMember(i, key, e.target.value)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}


                {/* ACTIONS */}
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancel}>
                        Anuluj
                    </button>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Wysyłanie..." : "Wyślij"}
                    </button>
                </div>
            </div>
        </div>
    );
}
