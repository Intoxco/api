package lfjob.api.others.gsonData;

import com.google.gson.annotations.SerializedName;
import lfjob.api.job.Job;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BodyData{
    private String message;
    private String code;
    private List<FieldError> details;
    private String name;
    private String business;
    private String street;
    private String password;
    private String username;
    private String number;
    private String phone;
    private String email;
    private String education;
    private String experience;
    private String title;
    private String area;
    private String description;
    private String location;
    private String contact;
    private Double salary;
    @SerializedName("job_id")
    private Integer jobId;
    // nao sei como sera private Token token;
    private Filter filter;
    private List<Job> items;
}
