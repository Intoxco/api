CREATE TABLE job(
    job_id int(11) NOT NULL AUTO_INCREMENT,
    user_id int(11) NOT NULL,
    title varchar(150) NOT NULL,
    area varchar(100) NOT NULL,
    description varchar(5000) NOT NULL,
    location varchar(150) NOT NULL,
    salary decimal(10,2),
    primary key(job_id),
    foreign key(user_id) references company(user_id)
)