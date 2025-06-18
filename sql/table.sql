create table if not exists state_master (
  state_id bigint primary key auto_increment,
  state_name varchar(100) not null unique
);

create table if not exists city_master (
  city_id bigint primary key auto_increment,
  city_name varchar(100) not null,
  state_id bigint not null,
  constraint fk_city_state foreign key (state_id) references state_master(state_id)
);
select * from aadhar_users;
create table if not exists aadhar_users (
  tid bigint primary key auto_increment,
  first_name varchar(100) not null,
  last_name varchar(100),
  dob date not null,
  gender varchar(10) not null,
  mobile_number varchar(15) not null,
  email_id varchar(255) not null,
  address text,
  create_date datetime default current_timestamp,
  updated_date datetime default current_timestamp on update current_timestamp,
  aadhar_number char(12) unique not null,
  city_id bigint,
  state_id bigint,
  preferences json,
  profile_picture varchar(255),
  constraint fk_user_city foreign key (city_id) references city_master(city_id),
  constraint fk_user_state foreign key (state_id) references state_master(state_id)
);

create table if not exists vaccination (
  tid bigint primary key,
  dose1_date date,
  dose2_date date,
  constraint fk_vac_user foreign key (tid) references aadhar_users(tid)
);

create table if not exists system_log (
  log_id int primary key auto_increment,
  operation_name varchar(100) not null,
  description varchar(255),
  executed_at datetime(6) not null default current_timestamp(6),
  duration_seconds decimal(12,6) not null
);

-- MASTER 

insert ignore into state_master (state_name) values
('Karnataka'), ('Maharashtra'), ('Tamil Nadu'), ('Delhi'), ('Goa'), ('Kerala');
-- truncate table state_master;
-- truncate table city_master;
select * from city_master;
insert ignore into city_master (city_name, state_id) values
('Bengaluru', (select state_id from state_master where state_name='Karnataka')),
('Mysuru',    (select state_id from state_master where state_name='Karnataka')),
('Bagalkot',  (select state_id from state_master where state_name='Karnataka')),
('Tumkur',    (select state_id from state_master where state_name='Karnataka')),
('Mumbai',    (select state_id from state_master where state_name='Maharashtra')),
('Pune',      (select state_id from state_master where state_name='Maharashtra')),
('Thane',     (select state_id from state_master where state_name='Maharashtra')),
('Chennai',   (select state_id from state_master where state_name='Tamil Nadu')),
('Panaji',    (select state_id from state_master where state_name='Goa')),
('Thiruvananthapuram', (select state_id from state_master where state_name='Kerala'));