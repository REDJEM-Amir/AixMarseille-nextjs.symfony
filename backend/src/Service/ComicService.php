<?php

namespace App\Service;

use setasign\Fpdi\Fpdi;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Psr\Log\LoggerInterface;

class ComicService
{
    private $pdfDirectory;
    private $imageDirectory;
    private $logger;

    public function __construct(string $pdfDirectory, string $imageDirectory, LoggerInterface $logger)
    {
        $this->pdfDirectory = $pdfDirectory;
        $this->imageDirectory = $imageDirectory;
        $this->logger = $logger;
    }

    public function handleUpload(UploadedFile $file): array
    {
        $this->logger->info('Handling file upload');
        // Sauvegarde du fichier PDF
        $pdfPath = $this->pdfDirectory . '/' . uniqid() . '.pdf';
        $file->move($this->pdfDirectory, $pdfPath);
        $this->logger->info('PDF saved to ' . $pdfPath);

        // Extraction de la première page en image
        $imagePath = $this->extractFirstPageAsImage($pdfPath);

        return ['pdf' => $pdfPath, 'picture' => $imagePath];
    }

    private function extractFirstPageAsImage($pdfPath): string
    {
        // Chemin temporaire pour sauvegarder la première page comme PDF
        $tempPdfPath = $this->pdfDirectory . '/' . uniqid() . '_page1.pdf';

        // Extraire la première page du PDF
        $fpdi = new FPDI();
        $fpdi->AddPage();
        $fpdi->setSourceFile($pdfPath);
        $templateId = $fpdi->importPage(1);
        $fpdi->useTemplate($templateId, 0, 0);

        // Sauvegarder la première page comme un fichier PDF séparé
        $fpdi->Output($tempPdfPath, 'F');
        $this->logger->info('First page extracted to ' . $tempPdfPath);

        // Convertir le PDF en image
        $imagePath = $this->imageDirectory . '/' . uniqid() . '.jpg';
        $this->convertPdfToImage($tempPdfPath, $imagePath);

        // Supprimer le fichier PDF temporaire
        unlink($tempPdfPath);

        $this->logger->info('Image saved to ' . $imagePath);

        return $imagePath;
    }

    private function convertPdfToImage($pdfPath, $imagePath)
    {
        // Utilisation de Ghostscript pour convertir le PDF en image
        $output = [];
        $returnVar = null;
        $command = "gs -sDEVICE=jpeg -dNOPAUSE -dBATCH -sOutputFile=$imagePath -r300 $pdfPath";
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            $this->logger->error('Error converting PDF to image: ' . implode("\n", $output));
            throw new \Exception('Erreur lors de la conversion du PDF en image : ' . implode("\n", $output));
        }

        $this->logger->info('PDF converted to image: ' . $imagePath);
    }
}