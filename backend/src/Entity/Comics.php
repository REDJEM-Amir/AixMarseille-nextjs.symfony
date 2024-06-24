<?php

namespace App\Entity;

use App\Repository\ComicsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ComicsRepository::class)]
class Comics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private string $title;

    #[ORM\Column(type: 'text')]
    private $picture;

    #[ORM\Column(type: 'text')]
    private $pdf;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $uploadDate;

    public function __construct()
    {
        $this->uploadDate = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getPicture()
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;
        return $this;
    }

    public function getPdf()
    {
        return $this->pdf;
    }

    public function setPdf(string $pdf): self
    {
        $this->pdf = $pdf;
        return $this;
    }

    public function getUploadDate(): ?\DateTime
    {
        return $this->uploadDate;
    }

    public function setUploadDate(\DateTime $uploadDate): self
    {
        $this->uploadDate = $uploadDate;
        return $this;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'picture' => $this->getPicture(),
            'pdf' => $this->getPdf(),
            'uploadDate' => $this->getUploadDate()->format('Y-m-d H:i:s'),
        ];
    }

    public function toSimpleArray(): array
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'picture' => $this->getPicture(),
            'uploadDate' => $this->getUploadDate()->format('Y-m-d H:i:s'),
        ];
    }
}