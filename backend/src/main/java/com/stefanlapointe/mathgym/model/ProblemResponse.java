package com.stefanlapointe.mathgym.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProblemResponse {
    private String problemType;
    private int seed;
    private String response;
}
