import db from '@/app/lib/db';

export async function GET(req, context) {
    const { id } = await context.params;

    const [rows] = await db.query(`
        SELECT
            m.*,

            ta.id   AS team_a_id,
            ta.name AS team_a_name,
            ta.image_url AS team_a_image,

            tb.id   AS team_b_id,
            tb.name AS team_b_name,
            tb.image_url AS team_b_image,

            tw.id   AS winner_id,
            tw.name AS winner_name

        FROM MatchGame m
                 LEFT JOIN Team ta ON m.team_a_id = ta.id
                 LEFT JOIN Team tb ON m.team_b_id = tb.id
                 LEFT JOIN Team tw ON m.winner_id = tw.id

        WHERE m.stage_id = ?
        ORDER BY m.round_number ASC
    `, [id]);


    return Response.json(rows);
}
