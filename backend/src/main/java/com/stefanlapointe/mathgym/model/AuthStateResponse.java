package com.stefanlapointe.mathgym.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthStateResponse {
    private boolean authenticated;
    private String username;
}
