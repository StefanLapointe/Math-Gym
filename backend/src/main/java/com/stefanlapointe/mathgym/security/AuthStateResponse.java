package com.stefanlapointe.mathgym.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthStateResponse {
    private boolean authenticated;
    private String username;
}
