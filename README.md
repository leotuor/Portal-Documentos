# Portal-Documentos

## SQL Banco Postgresql
create table aluno (id serial primary key, nome varchar(75) not null, data_nascimento date not null, matricula varchar(14), created_at timestamp default now(), updated_at timestamp default now()); \n
create table tipo_declaracao(id int primary key, tipo varchar(30) not null); \n
create table pedidos_declaracoes (id serial primary key, id_tipo_declaracao int references tipo_declaracao (id), id_aluno int references aluno (id), created_at timestamp default now(), updated_at timestamp default now());
