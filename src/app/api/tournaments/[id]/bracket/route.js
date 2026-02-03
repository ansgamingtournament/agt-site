import pool from '@/app/lib/db';

export async function GET(req, context) {
    const { id } = await context.params;

    try {
        const [matches] = await pool.query(`
            SELECT
                m.id,
                m.round_number,
                m.bracket_position,
                m.start_date,

                ta.id AS team_a_id,
                ta.name AS team_a_name,
                ta.image_url AS team_a_image,

                tb.id AS team_b_id,
                tb.name AS team_b_name,
                tb.image_url AS team_b_image,

                w.id AS winner_id,
                w.name AS winner_name

            FROM MatchGame m
                     JOIN Stage s ON s.id = m.stage_id
                     LEFT JOIN Team ta ON ta.id = m.team_a_id
                     LEFT JOIN Team tb ON tb.id = m.team_b_id
                     LEFT JOIN Team w ON w.id = m.winner_id
            WHERE s.tournament_id = ?
            ORDER BY m.round_number, m.bracket_position
        `, [id]);

        return Response.json(matches);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
