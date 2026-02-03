import pool from '@/app/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT
                t.id,
                t.start_date,
                t.end_date,
                g.name AS game_name,
                g.image_url AS game_image,
                w.name AS winner_name,

                CASE
                    WHEN NOW() > t.end_date THEN 'OVER'
                    WHEN NOW() BETWEEN t.start_date AND t.end_date THEN 'CURRENT'
                    ELSE 'FUTURE'
                END AS status

            FROM Tournament t
            JOIN Game g ON g.id = t.game_id
            LEFT JOIN Team w ON w.id = t.winner_team_id
            ORDER BY t.start_date DESC
        `);

        return Response.json(rows);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
