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
    const [rows] = await pool.query(`SELECT * FROM Stage ORDER BY order_index`);
    return NextResponse.json(rows);
}

export async function POST(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const {
        tournament_id,
        name,
        stage_type,
        order_index
    } = await req.json();

    const [result] = await pool.query(
        `
            INSERT INTO Stage
                (tournament_id, name, stage_type, order_index)
            VALUES (?, ?, ?, ?)
        `,
        [
            tournament_id,
            name || null,
            stage_type,
            order_index || null
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
        tournament_id,
        name,
        stage_type,
        order_index
    } = await req.json();

    await pool.query(
        `
            UPDATE Stage
            SET
                tournament_id = ?,
                name = ?,
                stage_type = ?,
                order_index = ?
            WHERE id = ?
        `,
        [
            tournament_id,
            name || null,
            stage_type,
            order_index || null,
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

    await pool.query(`DELETE FROM Stage WHERE id = ?`, [id]);

    return NextResponse.json({ ok: true });
}
