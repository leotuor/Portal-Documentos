# Portal-Documentos

## SQL Banco Postgresql
create table aluno (id serial primary key, nome varchar(75) not null, data_nascimento date not null, matricula varchar(14), created_at timestamp default now(), updated_at timestamp default now()); 
create table tipo_declaracao(id int primary key, tipo varchar(30) not null); 
create table pedidos_declaracoes (id serial primary key, id_tipo_declaracao int references tipo_declaracao (id), id_aluno int references aluno (id), created_at timestamp default now(), updated_at timestamp default now()); 
insert into tipo_declaracao(id, tipo) values (1, 'matricula'); 
insert into tipo_declaracao(id, tipo) values (2, 'conclusao'); 
insert into tipo_declaracao(id, tipo) values (3, 'frequencia'); 
