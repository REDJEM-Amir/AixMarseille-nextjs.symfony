'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import css from '@/styles/viewcomic.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type ViewComicType = {
    id: number,
    title: string,
    pdf: string,
    picture: string,
    uploadDate: string
};

const ViewComic = ({
    params
}: {
    params: { id: number; };
}) => {
    const [viewComic, setViewComic] = useState<ViewComicType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | undefined>(undefined);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/comics/${params.id}`);
            setViewComic(response.data);
        } catch (error) {
            setError('Failed to load comic');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error: Error): void => {
        setError('Failed to load PDF file.');
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!viewComic) {
        return <div>Loading...</div>;
    }

    return (
        <div className={css.viewerContainer}>
            <Document
                className={css.document}
                file={`data:application/pdf;base64,${viewComic.pdf}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
            >
                <Page 
                    pageNumber={pageNumber} 
                    width={500}
                />
            </Document>
            <p>
                Page {pageNumber} of {numPages ?? '...'}
            </p>
            <div>
                <button 
                    disabled={pageNumber <= 1} 
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>
                <button 
                    disabled={numPages === undefined || pageNumber >= numPages} 
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ViewComic;