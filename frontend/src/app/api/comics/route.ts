import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const response = await axios.get(`http://localhost:5601/api/comics`);
    return new NextResponse(JSON.stringify(response.data), {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}