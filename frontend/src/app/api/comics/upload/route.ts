import axios from 'axios';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req: Request) {
    const session = await getSession();
    const token = session?.idToken;
    if (!token) {
        return NextResponse.json({ error: 'Access token not found' }, { status: 401 });
    }
    const body = await req.json();
    const response = await axios.post('http://localhost:5601/api/comics/upload', body, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return new NextResponse(JSON.stringify(response.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}