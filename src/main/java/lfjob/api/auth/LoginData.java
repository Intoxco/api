package lfjob.api.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginData(
        @NotBlank(message = "must not be null")
        String username,
        @NotBlank(message =" must not be null")
        String password
) {}
