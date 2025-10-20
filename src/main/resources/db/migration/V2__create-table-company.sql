CREATE TABLE company (
    name varchar(150) NOT NULL,
    street varchar(150) NOT NULL,
    number int(11) NOT NULL,
    city varchar(150) NOT NULL,
    state varchar(2) NOT NULL,
    phone varchar(14)  NOT NULL,
    email varchar(150) NOT NULL,
    user_id  int(11) NOT NULL,
    business varchar(150) NOT NULL,
    password varchar(20)  NOT NULL,
    primary key(user_id),
    foreign key(user_id) references user(user_id)
)