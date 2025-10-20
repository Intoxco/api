package lfjob.api.job;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobGetData {
    @SerializedName("job_id")
    private long id;
    private String company;
    private String title;
    private String area;
    private String description;
    private String location;
    private Double salary;
    private String contact;
}
