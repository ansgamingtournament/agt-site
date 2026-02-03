import { NextResponse } from 'next/server';

export async function POST(req) {
    const { secret } = await req.json();

    if (secret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set('role', 'admin', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
    });

    return res;
}
