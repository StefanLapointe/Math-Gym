package com.stefanlapointe.mathgym.routine;

import lombok.Getter;

import java.util.List;

@Getter
public class Routine {
    record Component(String problemType, int count) {};

    private final List<Component> components;
    private final int length;

    Routine(List<Component> components) {
        this.components = List.copyOf(components);
        length = components.stream()
                .map(Component::count)
                .reduce(0, Integer::sum);
    }

    String decideProblemType(int problemNumber) {
        if (problemNumber < 1) {
            String message = "Argument problemNumber must be at least 1";
            throw new IllegalArgumentException(message);
        }
        if (problemNumber > length) {
            String message = "Argument problemNumber must be at most this.length";
            throw new IllegalArgumentException(message);
        }

        // Due to the length check, this for loop will always return
        int total = 0;
        for (Component c : components) {
            total += c.count();
            if (problemNumber <= total) return c.problemType();
        }

        // This is unreachable
        return null;
    }

    List<Component> getComponents() {
        // This List is immutable
        return components;
    }
}
