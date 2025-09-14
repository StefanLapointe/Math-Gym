package com.stefanlapointe.mathgym.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/csrf")
public class CsrfController {
    @GetMapping
    CsrfToken get(CsrfToken csrfToken) {
        return csrfToken;
    }
}
