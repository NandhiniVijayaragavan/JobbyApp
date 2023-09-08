create database jobbyapp_db;
use jobbyapp_db;

create table user (id int primary key auto_increment, name varchar(200), 
email varchar(100), phoneno bigint(11),image varchar(200), password varchar(100), 
isemployer boolean, dob date, about text);

select * from user;
delete from user where id=35;
update jobs set company_name="HCL" where jobId=28;
create table jobs (jobId int auto_increment not null primary key , 
company_logo varchar(250), company_name varchar(200), job_role varchar(200), 
location varchar(200), skills varchar(500), salary int, responsibilities varchar(1000),
 experience int, about_job varchar(1000), about_company varchar(1000),
 userId int, foreign key(userId) references user(id));
 
 select * from jobs;

