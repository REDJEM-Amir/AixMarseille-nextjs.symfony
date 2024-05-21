<?php

namespace App\Repository;

use App\Entity\Comics;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<Comics>
 */
class ComicsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comics::class);
    }

    public function save(Comics $comic)
    {
        $this->_em->persist($comic);
        $this->_em->flush();
    }

    public function findAllPaginated(int $page, int $limit): Paginator
    {
        $query = $this->createQueryBuilder('c')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery();

        return new Paginator($query, true);
    }

    public function findAllPaginatedAndFilteredByType(int $page, int $limit, ?string $type)
    {
        $queryBuilder = $this->createQueryBuilder('c');

        if ($type) {
            $queryBuilder->andWhere('c.type = :type')
                ->setParameter('type', $type);
        }

        $queryBuilder->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        $paginator = new Paginator($queryBuilder, $fetchJoinCollection = true);

        return $paginator;
    }
}
