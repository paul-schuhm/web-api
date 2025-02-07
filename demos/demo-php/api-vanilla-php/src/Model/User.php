<?php

namespace API\Model;

//Un objet métier de notre service (peut être exposé ou non comme une ressource)
readonly class User
{
    public function __construct(
        public int $id,
        public string $fullName
    ) {}
}
