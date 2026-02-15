import styles from '@/app/styles/TournamentCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import RegistrationModal from "@/app/components/registration/RegistrationModal";
import { TOURNAMENT_STATUS } from "@/app/constants/TournamentStatus";

export default function TournamentCard({ tournament }) {
    const [open, setOpen] = useState(false);

    const openRegistration = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    };

    const isLocked = tournament.status === "FUTURE";

    const statusConfig = TOURNAMENT_STATUS[tournament.status];
    const statusLabel = statusConfig?.label ?? tournament.status;

    const CardContent = (
        <div className={`${styles.card} ${isLocked ? styles.locked : ""}`}>
            <div className={styles.imageWrapper}>
                <Image
                    src={tournament.game_image}
                    alt={tournament.game_name}
                    fill
                    className={styles.image}
                    unoptimized
                />
            </div>

            <div className={styles.content}>
                <h3>{tournament.game_name}</h3>

                <p>
                    {new Date(tournament.start_date).toLocaleDateString()} –{" "}
                    {new Date(tournament.end_date).toLocaleDateString()}
                </p>

                {tournament.status === "OVER" && tournament.winner_name && (
                    <span className={styles.winner}>
                    Zwycięzca: {tournament.winner_name}
                </span>
                )}

                <div className={styles.footer}>
                <span
                    className={`${styles.badge} ${styles[tournament.status]}`}
                >
                    {statusLabel}
                </span>

                    {isLocked && (
                        <button
                            className={styles.registerBtn}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(
                                    tournament.form_url,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                        >
                            Rejestracja
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isLocked ? (
                CardContent
            ) : (
                <Link
                    href={`/tournaments/${tournament.id}`}
                    className={styles.cardLink}
                >
                    {CardContent}
                </Link>
            )}

            <RegistrationModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
