import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';

    const response = await axios.get(`http://localhost:5601/api/comics?type=${type}`);
    return new NextResponse(JSON.stringify(response.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}