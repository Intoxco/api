package lfjob.api.common_user;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;

public record CommonUserCreateData(
        @NotBlank(message="Must not be blank")
        @Size(min=4,max = 150,message="Must have 4 to 150 characters")
        String name,
        @NotBlank(message="Must not be blank")
        @Pattern(regexp = "^[0-9a-zA-Z]{3,20}$",message="Must have 3 to 20 non-especial characters")
        String username,
        @NotBlank(message="Must not be blank")
        @Pattern(regexp = "^[0-9a-zA-Z]{3,20}$",message="Must have 3 to 20 non-especial characters")
        String password,
        @Nullable
        @Email(message="Invalid email format")
        String email,
        @Pattern(regexp = "^(\\([0-9]{2}\\)|[0-9]{2})9?[0-9]{4}-?[0-9]{4}$",message="Invalid format,should be (NN)NNNNN-NNNN")
        String phone,
        @Size(min=10,max=600,message="Must have 10 to 600 characters")
        String experience,
        @Size(min=10,max=600,message="Must have 10 to 600 characters")
        String education){}
