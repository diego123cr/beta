CREATE DATABASE beta;

CREATE TABLE public.departamento (
	id serial NOT NULL,
	nombre varchar(32) NULL,
	borrado_en date, -- NULL if existe date si borrado en X fecha     
	CONSTRAINT departamento_pk PRIMARY KEY (id)
);

INSERT INTO public.departamento (nombre, borrado_en) VALUES('Departamento 1', NULL);
INSERT INTO public.departamento (nombre, borrado_en) VALUES('Departamento 2', NULL);
INSERT INTO public.departamento (nombre, borrado_en) VALUES('Departamento 3', NULL);

CREATE TABLE public.rol (
	id serial NOT NULL,
	nombre varchar(64) NULL,
	salario_minimo numeric(10, 2 ) NULL,
	salario_minimo numeric(10, 2 ) NULL,
	CONSTRAINT rol_pk PRIMARY KEY (id)
);

INSERT INTO public.rol ( nombre, salario_minimo, salario_maximo ) VALUES( 'Desarrollador Junior', 900000.00, 1200000.00);
INSERT INTO public.rol ( nombre, salario_minimo, salario_maximo )  VALUES( 'Desarrollador Senior', 2000000.00, 3200000.00);
INSERT INTO public.rol ( nombre, salario_minimo, salario_maximo )  VALUES( 'Gerente', 4000000.00, 7000000.00);


CREATE TABLE public.empleado (
	id serial NOT NULL,
	nombre varchar(64) NULL,
	rol int4 references rol(id) on delete restrict on update cascade,
	departamento int4 references departamento(id) on delete restrict on update cascade,
	salario numeric(10, 2 ) NULL,
	borrado_en date, -- NULL if activo     
	CONSTRAINT empleado_pk PRIMARY KEY (id)
); 


INSERT INTO public.empleado ( nombre, rol, departamento, salario, borrado_en) VALUES('Diego Quiros', 2,  1, 2500000,  NULL);
INSERT INTO public.empleado ( nombre, rol, departamento, salario, borrado_en) VALUES('Daniela Mora', 1,  1, 1000000, NULL);
INSERT INTO public.empleado ( nombre, rol, departamento, salario, borrado_en) VALUES('Pedro Perez',  3,  1, 4500000, NULL);
INSERT INTO public.empleado ( nombre, rol, departamento, salario, borrado_en) VALUES('Maria Castro', 1,  1, 1100000, '2022-05-01');

SELECT id, nombre FROM rol where id in ( SELECT rol FROM empleado ORDER BY salario desc limit 1);

UPDATE empleado 
    SET departamento =  ( SELECT id FROM departamento where id not in (4)  ORDER BY RANDOM() limit 1)
     where id = 1;