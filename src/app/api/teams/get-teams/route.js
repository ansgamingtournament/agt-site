import pool from '@/app/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT id, name, image_url
            FROM \`Team\`
        `);

        return Response.json(rows);
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
