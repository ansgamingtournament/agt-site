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
                        Competitive esports platform built for players who want to win.
                    </p>
                    <span className={styles.owner}>
                        © {new Date().getFullYear()} ANS Gaming Tournament
                    </span>
                </div>

                {/* COMMUNITY ICONS */}
                <div className={styles.community}>
                    <h4>Community</h4>

                    <div className={styles.icons}>

                        {/* Discord */}
                        <a href="https://discord.gg/yGPM6vFr" target="_blank">
                            <svg viewBox="0 0 24 24">
                                <path d="M20 4a16 16 0 0 0-4-1c-.2.4-.4.8-.6 1.2a15 15 0 0 0-6.8 0c-.2-.4-.4-.8-.6-1.2A16 16 0 0 0 4 4C1.5 8 1 11.9 1.2 15.8A16 16 0 0 0 6 18c.4-.5.8-1 1.1-1.6a10 10 0 0 1-1.7-.8c.1-.1.2-.1.3-.2 3.2 1.5 6.7 1.5 9.9 0 .1.1.2.1.3.2-.5.3-1.1.6-1.7.8.3.6.7 1.1 1.1 1.6a16 16 0 0 0 4.8-2.2C23 11.9 22.5 8 20 4ZM9.3 13.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2Zm5.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2Z"/>
                            </svg>
                        </a>

                        {/* Twitter/X */}
                        <a href="#">
                            <svg viewBox="0 0 24 24">
                                <path d="M18 2h3l-7.5 8.6L22 22h-6l-4.7-6.1L6 22H3l8-9.2L2 2h6l4.2 5.5L18 2Z"/>
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="#">
                            <svg viewBox="0 0 24 24">
                                <path d="M23 7s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C17 3.5 12 3.5 12 3.5h0s-5 0-8.1.3c-.4.1-1.3.1-2.1.9C1.2 5.4 1 7 1 7S.8 8.9.8 10.7v1.6C.8 14.1 1 16 1 16s.2 1.6.8 2.3c.8.8 1.9.8 2.4.9 1.8.2 7.8.3 7.8.3s5 0 8.1-.3c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.9.2-3.7v-1.6C23.2 8.9 23 7 23 7ZM9.8 14.6V7.8l6.5 3.4-6.5 3.4Z"/>
                            </svg>
                        </a>

                        {/* Twitch */}
                        <a href="https://www.twitch.tv/agt_ans" target="_blank">
                            <svg viewBox="0 0 24 24">
                                <path d="M2 2v16h5v4l4-4h5l4-4V2H2zm16 10h-3v3h-2v-3H8V4h10v8z"/>
                            </svg>
                        </a>

                    </div>
                </div>

                {/* PLATFORM LINKS */}
                <div className={styles.links}>
                    <h4>Platform</h4>
                    <a href="/about">About</a>
                    <a href="/rules">Rules</a>
                    <a href="/terms">Terms of Service</a>
                </div>

            </div>

            <div className={styles.bottom}>
                Built for competitive gaming ⚡
            </div>

        </footer>
    );
}
