import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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