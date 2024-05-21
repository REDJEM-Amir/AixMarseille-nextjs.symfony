<?php

namespace App\Controller;

use App\Entity\Comics;
use App\Repository\ComicsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;

class ComicController extends AbstractController
{
    private $comicsRepository;
    private $entityManager;
    private $logger;

    public function __construct(ComicsRepository $comicsRepository, EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->comicsRepository = $comicsRepository;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    #[Route('/api/comics', name: 'comics_get_all', methods: ['GET'])]
    public function getAllComics(Request $request): JsonResponse
    {
        ini_set('memory_limit', '2G');

        $page = $request->query->getInt('page', 1);
        $limit = 25;
        $type = $request->query->get('type');
    
        $paginator = $this->comicsRepository->findAllPaginatedAndFilteredByType($page, $limit, $type);
    
        $data = array_map(function (Comics $comic) {
            return $comic->toSimpleArray();
        }, (array) $paginator->getIterator());
    
        return new JsonResponse([
            'data' => $data,
            'total' => $paginator->count(),
            'current_page' => $page,
            'total_pages' => ceil($paginator->count() / $limit),
        ], 200);
    }

    #[Route('/api/comics/{id}', name: 'comic_get', methods: ['GET'])]
    public function getComic(int $id): JsonResponse
    {
        ini_set('memory_limit', '2G');

        $comic = $this->comicsRepository->find($id);

        if (!$comic) {
            return new JsonResponse(['message' => 'Comic not found'], 404);
        }

        return new JsonResponse($comic->toArray(), 200);
    }

    #[Route('/api/comics/upload', name: 'comic_upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        ini_set('memory_limit', '2G');
    
        $this->logger->info('Upload endpoint hit');
    
        $data = json_decode($request->getContent(), true);
        $title = $data['title'] ?? null;
        $type = $data['type'] ?? null;
        $pdfBase64 = $data['pdf'] ?? null;
        $imageBase64 = $data['picture'] ?? null;
    
        if ($pdfBase64 && $title && $imageBase64 && $type) {
            try {
                $comic = new Comics();
                $comic->setTitle($title);
                $comic->setType($type);
                $comic->setPdf($pdfBase64);
                $comic->setPicture($imageBase64);
    
                $this->entityManager->persist($comic);
                $this->entityManager->flush();
    
                $this->logger->info('Upload successful');
    
                return new JsonResponse(['message' => 'Upload successful'], 200);
            } catch (\Exception $e) {
                $this->logger->error('Upload failed: ' . $e->getMessage());
                return new JsonResponse(['message' => 'Upload failed: ' . $e->getMessage()], 500);
            }
        }
    
        $this->logger->error('Upload failed, missing title or file');
        return new JsonResponse(['message' => 'Upload failed, missing title, type or file'], 400);
    }    
}