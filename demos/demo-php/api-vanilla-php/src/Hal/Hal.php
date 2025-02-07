<?php

/**
 * Produit des documents au format HAL
 */

namespace API\Hal;

class Hal
{

    /**
     * Retourne un HAL Link Object, conforme à la spécification HAL
     */
    static public function halLinkObject(string $path, string $type = '', bool $templated = false, bool $deprecation = false): array
    {

        return array_merge(
            ['href' => $path],
            ['templated' => $templated],
            $type ? ['type' => $type] : [],
            $deprecation ? ['deprecation' => $deprecation] : [],
        );
    }
}
