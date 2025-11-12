package lfjob.api.company;

import jakarta.validation.constraints.*;

public record CompanyCreateData(
        @Size(min=4,max = 150, message="Must have between 4 and 150 letters")
        @NotBlank
        String name,
        @NotBlank(message="Must not be blank")
        @Size(min=4,max = 150, message="Must have between 4 and 150 letters")
        String business,
        @NotNull(message="Must not be null")
        @Pattern(regexp="^[0-9a-zA-Z]{3,20}",message="Must have 3 to 20 non-especial characters")
        String username,
        @NotNull(message="Must not be null")
        @Pattern(regexp="^[0-9a-zA-Z]{3,20}",message="Must have 3 to 20 non-especial characters")
        String password,
        @NotBlank(message="Must not be blank")
        @Size(min=4,max = 150, message="Must have between 4 and 150 letters")
        String street,
        @Pattern(regexp="^[0-9]{1,8}")
        @NotBlank(message="Must not be blank")
        String number,
        @Size(min=3,max = 150, message="Must have between 4 and 150 letters")
        @NotBlank(message="Must not be blank")
        String city,
        @NotNull(message="Must not be null")
        @Pattern(regexp="^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$",message="Invalid State, must be abbreviated and in upper case")
        String state,
        @Pattern(regexp = "^(\\([0-9]{2}\\)|[0-9]{2})9?[0-9]{4}-?[0-9]{4}$",message="Invalid format,should be (NN)NNNNN-NNNN")
        @NotNull(message="Must not be null")
        String phone,
        @Email(message = "Must have a valid email format")
        @Size(min=10,max = 150, message="Must have between 4 and 150 letters")
        @NotNull(message="Must not be null")
        String email
){
}