import db from '@/app/lib/db';

export async function GET(req, context) {
    const { slug } = await context.params;

    const [[tournament]] = await db.query(
        `SELECT id FROM Tournament WHERE slug = ?`,
        [slug]
    );

    if (!tournament) {
        return Response.json({ error: 'Tournament not found' }, { status: 404 });
    }

    const tournamentId = tournament.id;

    const [rows] = await db.query(`
        SELECT *
        FROM Stage
        WHERE tournament_id = ?
        ORDER BY order_index ASC
    `, [tournamentId]);

    return Response.json(rows);
}
