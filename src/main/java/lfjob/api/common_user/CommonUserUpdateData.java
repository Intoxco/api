package lfjob.api.common_user;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;

public record CommonUserUpdateData(
    @NotBlank
    @Size(min=4,max = 150)
    String name,
    @NotBlank
    @Pattern(regexp = "^[0-9a-zA-Z]{3,20}$")
    String password,
    @Email
    @Pattern(regexp = "^$|.+")
    String email,
    @Pattern(regexp = "^|.(\\([1-9]{2}\\)|[1-9]{2})9?[1-9]{4}-?[1-9]{4}$")
    String phone,
    @Pattern(regexp = "|.{10,600}")
    String experience,
    @Pattern(regexp = "|.{10,600}")
    String education
){}

