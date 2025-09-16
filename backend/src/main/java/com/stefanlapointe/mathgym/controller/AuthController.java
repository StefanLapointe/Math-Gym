package com.stefanlapointe.mathgym.controller;

import com.stefanlapointe.mathgym.model.AuthStateResponse;
import com.stefanlapointe.mathgym.model.LoginRequest;
import com.stefanlapointe.mathgym.model.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    LoginResponse login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        var token = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);
        securityContextRepository.saveContext(context, request, response);
        return new LoginResponse(true);
    }

    // The logout endpoint is configured in SecurityConfig

    @GetMapping("/state")
    AuthStateResponse state() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            return new AuthStateResponse(false, "");
        }
        String username = authentication.getName();
        return new AuthStateResponse(true, username);
    }
}
