<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

use App\Repository\AccountRepository;

class AccountController extends AbstractController
{
    #[Route('/api/accounts/findAll', name: 'app_account')]
    public function index(AccountRepository $accountRepository): JsonResponse
    {
        $accounts = $accountRepository->findAll();

        $data = [];
        foreach ($accounts as $account) {
            $data[] = [
                'id' => $account->getId(),
                'email' => $account->getEmail(),
                'isAdmin' => $account->getIsAdmin(),
            ];
        }

        return $this->json($data);
    }
}