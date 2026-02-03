import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const role = cookieStore.get('role')?.value;

    if (role === 'admin') {
        return NextResponse.json({ isAdmin: true });
    }

    return NextResponse.json({ isAdmin: false }, { status: 401 });
}
