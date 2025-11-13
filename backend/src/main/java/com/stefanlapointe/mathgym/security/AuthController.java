package com.stefanlapointe.mathgym.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(AuthService authService) {
        this.authService = authService;
        securityContextRepository = new HttpSessionSecurityContextRepository();
    }

    @PostMapping("/login")
    LoginResponse login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        SecurityContext securityContext = authService.attemptLogin(username, password);
        securityContextRepository.saveContext(securityContext, request, response);
        return new LoginResponse(true);
    }

    // The logout endpoint is configured in SecurityConfig

    @GetMapping("/state")
    AuthStateResponse state() {
        Optional<String> maybeUsername = authService.getUsername();
        return maybeUsername.map(s -> new AuthStateResponse(true, s))
                .orElseGet(() -> new AuthStateResponse(false, ""));
    }

    @PostMapping("/register")
    RegistrationResponse register(@RequestBody RegistrationRequest registrationRequest) {
        String username = registrationRequest.getUsername();
        String password = registrationRequest.getPassword();
        boolean success = authService.attemptRegistration(username, password);
        return new RegistrationResponse(success);
    }

    @DeleteMapping("/terminate")
    TerminationResponse terminate() {
        boolean success = authService.attemptTermination();
        return new TerminationResponse(success);
    }
}
