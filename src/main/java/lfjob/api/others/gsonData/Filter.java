package lfjob.api.others.gsonData;

import com.google.gson.annotations.SerializedName;

public class Filter {
    private String title;
    private String area;
    private String company;
    private String description;
    private String location;
    @SerializedName("salary_range")
    private SalaryRange salaryRange;
}
