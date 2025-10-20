package lfjob.api.job;

public record JobCreateData(String title, String area, String description, String location, String contact, Double salary, Long company_id){

}