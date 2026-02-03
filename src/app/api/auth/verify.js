import { authAdmin } from '@/app/lib/firebaseAdmin';
import db from '@/app/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { token } = req.body;

    try {
        const decoded = await authAdmin.verifyIdToken(token);
        const uid = decoded.uid;

        const displayName = decoded.name || null;
        const photoURL = decoded.picture || null;

        const [rows] = await db.execute('SELECT * FROM User WHERE auth_id = ?', [uid]);

        let userData = {
            uid,
            displayName,
            photoURL,
            role: 'user' // default role
        };

        if (rows.length === 0) {
            await db.execute(
                'INSERT INTO User (auth_id, name, photo_url, role) VALUES (?, ?, ?, ?)',
                [uid, displayName, photoURL, 'user']
            );
        } else {
            await db.execute(
                'UPDATE User SET name = ?, photo_url = ? WHERE auth_id = ?',
                [displayName, photoURL, uid]
            );
            userData.role = rows[0].role || 'user';
        }

        res.status(200).json({ success: true, user: userData });
    } catch (err) {
        console.error('Token verification failed', err);
        res.status(401).json({ error: 'Invalid token' });
    }
}