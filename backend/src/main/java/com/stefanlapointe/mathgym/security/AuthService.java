package com.stefanlapointe.mathgym.security;

import com.stefanlapointe.mathgym.user.User;
import com.stefanlapointe.mathgym.user.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    AuthService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    /**
     * Throws AuthenticationException if credentials are incorrect
     */
    SecurityContext attemptLogin(String username, String password) {
        var token = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);
        return securityContext;
    }

    // Logout functionality is configured in SecurityConfig

    Optional<String> getUsername() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        String username = authentication.getName();
        return Optional.of(username);
    }

    boolean attemptRegistration(String username, String password) {
        if (!username.matches("\\p{Graph}*")) return false;
        if (username.length() < 3 || username.length() > 20) return false;
        if (!password.matches("\\p{ASCII}*")) return false;
        if (password.length() < 4 || password.length() > 72) return false;
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(null, username, encodedPassword);
        try {
            userRepository.save(user);
        } catch (RuntimeException e) {
            return false;
        }
        return true;
    }

    boolean attemptTermination() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            return false;
        }
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
        return true;
    }

}
