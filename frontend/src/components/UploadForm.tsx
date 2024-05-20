'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const UploadForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            if (e.target.id === 'pdf') {
                setPdfFile(file);
            } else if (e.target.id === 'image') {
                setImageFile(file);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title) {
            setSnackbar({ open: true, message: 'Please enter a title.', severity: 'warning' });
            return;
        }

        if (!pdfFile) {
            setSnackbar({ open: true, message: 'Please upload a PDF file.', severity: 'warning' });
            return;
        }

        if (!imageFile) {
            setSnackbar({ open: true, message: 'Please upload an image file.', severity: 'warning' });
            return;
        }

        const readFileAsBase64 = (file: File) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result as string);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        try {
            const [pdfBase64, imageBase64] = await Promise.all([
                readFileAsBase64(pdfFile),
                readFileAsBase64(imageFile),
            ]);

            const body = {
                title,
                picture: imageBase64.split(',')[1],
                pdf: pdfBase64.split(',')[1],
            };

            setSnackbar({ open: true, message: 'Starting upload...', severity: 'info' });

            const response = await axios.post('/api/comics/upload', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    if (total !== undefined) {
                        const percent = Math.round((loaded * 100) / total);
                        setProgress(percent);
                        setSnackbar({ open: true, message: `Uploaded ${loaded} bytes of ${total} (${percent}%)`, severity: 'info' });
                    }
                },
            });
            setSnackbar({ open: true, message: 'Upload successful!', severity: 'success' });
        } catch (error: any) {
            setSnackbar({ open: true, message: `Upload failed: ${error.response?.data?.message || error.message}`, severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: '', severity: 'info' });
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
                <div>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {pdfFile && <progress value={progress} max="100" />}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UploadForm;