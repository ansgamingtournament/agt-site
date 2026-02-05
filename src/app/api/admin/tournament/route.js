import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function requireAdmin() {
    const role = (await cookies()).get('role')?.value;
    return role === 'admin';
}

export async function GET() {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [rows] = await pool.query(`SELECT * FROM Tournament`);
    return NextResponse.json(rows);
}

export async function POST(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {
        start_date,
        end_date,
        game_id,
        winner_team_id
    } = await req.json();

    const [result] = await pool.query(
        `
        INSERT INTO Tournament
        (start_date, end_date, game_id, winner_team_id)
        VALUES (?, ?, ?, ?)
        `,
        [
            start_date || null,
            end_date || null,
            game_id,
            winner_team_id || null
        ]
    );

    return NextResponse.json({ id: result.insertId });
}

export async function PUT(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {
        id,
        start_date,
        end_date,
        game_id,
        winner_team_id
    } = await req.json();

    await pool.query(
        `
        UPDATE Tournament
        SET
            start_date = ?,
            end_date = ?,
            game_id = ?,
            winner_team_id = ?
        WHERE id = ?
        `,
        [
            start_date || null,
            end_date || null,
            game_id,
            winner_team_id || null,
            id
        ]
    );

    return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await pool.query(`DELETE FROM Tournament WHERE id = ?`, [id]);

    return NextResponse.json({ ok: true });
}
