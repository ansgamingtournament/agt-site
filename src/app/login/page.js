"use client";
import {useState} from "react";

export default function AdminLogin() {
    const [secret, setSecret] = useState('');

    async function login() {
        await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret }),
        });

        window.location.reload();
    }

    return (
        <input
            type="password"
            placeholder="Admin secret"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
        />
    );
}
