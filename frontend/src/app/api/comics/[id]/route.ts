import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const id = await request.json();
    const response = await axios.get(`http://localhost:5601/api/comics/${id}`);
    return new NextResponse(JSON.stringify(response.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}