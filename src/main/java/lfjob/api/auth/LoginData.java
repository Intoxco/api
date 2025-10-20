package lfjob.api.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginData(
        @NotBlank
        @Pattern(regexp="[a-zA-Z1-9]{3,20}")
        String username,
        @Pattern(regexp="[a-zA-Z1-9]{3,20}")
        @NotBlank
        String password
) {}
