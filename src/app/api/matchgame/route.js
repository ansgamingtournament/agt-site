import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function requireAdmin() {
    const cookieStore = await cookies();
    const role = cookieStore.get('role')?.value;
    return role === 'admin';
}

export async function POST(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const body = await req.json();

    const winnerId =
        body.winner_id === '' || body.winner_id == null
            ? null
            : body.winner_id;

    const [result] = await pool.query(`
        INSERT INTO MatchGame
        (stage_id, round_number, bracket_position, team_a_id, team_b_id, winner_id, start_date, team_a_result, team_b_result)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        Number(body.stage_id),
        body.round_number,
        body.bracket_position,
        body.team_a_id || null,
        body.team_b_id || null,
        winnerId,
        body.start_date || null,
        body.team_a_result || null,
        body.team_b_result || null
    ]);

    return Response.json({ id: result.insertId });
}

export async function PUT(req) {
    if (!(await requireAdmin())) {

        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const body = await req.json();

    const winnerId =
        body.winner_id === '' || body.winner_id == null
            ? null
            : body.winner_id;

    await pool.query(`
        UPDATE MatchGame
        SET
            stage_id = ?,
            team_a_id = ?,
            team_b_id = ?,
            winner_id = ?,
            start_date = ?,
            team_a_result = ?,
            team_b_result = ?
        WHERE id = ?
    `, [
        body.stage_id,
        body.team_a_id || null,
        body.team_b_id || null,
        winnerId,
        body.start_date || null,
        body.team_a_result || null,
        body.team_b_result || null,
        body.id
    ]);

    return Response.json({ ok: true });
}
