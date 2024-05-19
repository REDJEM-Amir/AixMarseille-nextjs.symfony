'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

const UploadForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log("File selected:", e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title) {
            console.log('Please enter a title.');
            return;
        }

        if (!file) {
            console.log('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('pdf', file);

        console.log('Starting upload...');

        try {
            const response = await axios.post('/api/comics/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    if (total !== undefined) {
                        const percent = Math.round((loaded * 100) / total);
                        setProgress(percent);
                        console.log(`Uploaded ${loaded} bytes of ${total} (${percent}%)`);
                    }
                },
            });
            console.log('Upload successful:', response.data);
        } catch (error: any) {
            console.error('Upload failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pdf">Upload PDF:</label>
                    <input
                        type="file"
                        id="pdf"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {file && <progress value={progress} max="100" />}
        </div>
    );
};

export default UploadForm;