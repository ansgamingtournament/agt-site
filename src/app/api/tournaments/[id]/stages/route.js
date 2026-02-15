import db from '@/app/lib/db';

export async function GET(req, context) {
    const { id } = await context.params;

    const [rows] = await db.query(`
        SELECT *
        FROM Stage
        WHERE tournament_id = ?
        ORDER BY order_index ASC
    `, [id]);

    return Response.json(rows);
}
