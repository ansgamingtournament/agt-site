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
    const [rows] = await pool.query(`SELECT * FROM Game`);
    return NextResponse.json(rows);
}

export async function POST(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, image_url } = await req.json();

    const [result] = await pool.query(
        `INSERT INTO Game (name, image_url) VALUES (?, ?)`,
        [name, image_url || null]
    );

    return NextResponse.json({ id: result.insertId });
}

export async function PUT(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, name, image_url } = await req.json();

    await pool.query(
        `UPDATE Game SET name = ?, image_url = ? WHERE id = ?`,
        [name, image_url || null, id]
    );

    return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await pool.query(`DELETE FROM Game WHERE id = ?`, [id]);

    return NextResponse.json({ ok: true });
}
