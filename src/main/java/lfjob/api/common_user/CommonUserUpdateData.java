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
    @Pattern(regexp = "^$|^(\\([0-9]{2}\\)|[0-9]{2})9?[0-9]{4}-?[0-9]{4}$", message = "Must be empty or (XX)XXXXX-XXXX")    String phone,
    @Pattern(regexp = "|.{10,600}")
    String experience,
    @Pattern(regexp = "|.{10,600}")
    String education

){}


