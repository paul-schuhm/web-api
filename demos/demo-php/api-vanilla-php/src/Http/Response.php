<?php


namespace API\Http;

readonly class Response
{
    public function __construct(public string $body = "", public int $code = 200) {}
}
