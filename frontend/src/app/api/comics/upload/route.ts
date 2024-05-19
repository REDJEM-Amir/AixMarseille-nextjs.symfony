import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(res.status(500).json({ message: 'Erreur lors du traitement du formulaire.' }));
      }

      const titleField = fields.title;
      const title = Array.isArray(titleField) ? titleField[0] : titleField;

      const pdfFiles = files.pdf;
      const pdfFile = Array.isArray(pdfFiles) ? pdfFiles[0] : pdfFiles;

      if (!title || !pdfFile) {
        return resolve(res.status(400).json({ message: 'Titre ou fichier manquant.' }));
      }

      const formData = new FormData();
      formData.append('title', title as string);
      formData.append('pdf', fs.createReadStream(pdfFile.filepath));

      try {
        const response = await axios.post('http://localhost:5601/api/comics/upload', formData, {
          headers: formData.getHeaders(),
        });

        resolve(res.status(response.status).json(response.data));
      } catch (error: any) {
        resolve(res.status(error.response?.status || 500).json({ message: error.message }));
      }
    });
  });
}