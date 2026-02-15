'use client';

import styles from '@/app/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles.inner}>

                {/* BRAND */}
                <div className={styles.brand}>
                    <h3>ANS Gaming Tournament</h3>
                    <p>
                        Zapisz się do turniejów esportowych na naszej uczelni.
                    </p>
                </div>
            </div>

            <div className={styles.bottom}>
                © {new Date().getFullYear()} ANS Gaming Tournament
            </div>

        </footer>
    );
}
