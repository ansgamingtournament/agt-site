import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { slugify } from '@/app/lib/slugify';

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
        winner_team_id,
        form_url
    } = await req.json();

    const [[game]] = await pool.query(
        `SELECT name FROM Game WHERE id = ?`,
        [game_id]
    );

    if (!game) {
        return NextResponse.json(
            { error: 'Game not found' },
            { status: 400 }
        );
    }

    const datePart = start_date
        ? new Date(start_date).toISOString().slice(0, 10)
        : '';

    const slug = slugify(`${game.name}-${datePart}`);

    const [result] = await pool.query(`
        INSERT INTO Tournament
            (start_date, end_date, game_id, winner_team_id, form_url, slug)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        start_date || null,
        end_date || null,
        game_id,
        winner_team_id || null,
        form_url || null,
        slug
    ]);

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
        winner_team_id,
        form_url
    } = await req.json();

    const [[game]] = await pool.query(
        `SELECT name FROM Game WHERE id = ?`,
        [game_id]
    );

    if (!game) {
        return NextResponse.json(
            { error: 'Game not found' },
            { status: 400 }
        );
    }

    const datePart = start_date
        ? new Date(start_date).toISOString().slice(0, 10)
        : '';

    const slug = slugify(`${game.name}-${datePart}`);

    await pool.query(
        `
        UPDATE Tournament
        SET
            start_date = ?,
            end_date = ?,
            game_id = ?,
            winner_team_id = ?,
            form_url = ?,
            slug = ?
        WHERE id = ?
        `,
        [
            start_date || null,
            end_date || null,
            game_id,
            winner_team_id || null,
            form_url || null,
            slug,
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
