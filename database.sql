CREATE DATABASE twitter_like
  WITH ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'pt_BR.UTF-8'
       LC_CTYPE = 'pt_BR.UTF-8'
       CONNECTION LIMIT = -1;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(80) NULL,
	email varchar(60) NULL,
	"password" varchar(60) NULL,
	CONSTRAINT pk_user PRIMARY KEY (id),
	CONSTRAINT un_email UNIQUE (email)
);

-- Drop table

-- DROP TABLE public."token";

CREATE TABLE public."token" (
	"token" uuid NOT NULL,
	user_id uuid NOT NULL
);

-- Drop table

-- DROP TABLE public.message;

CREATE TABLE public.message (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	"text" varchar(200) NOT NULL,
	date_time timestamp(0) NULL DEFAULT now(),
	public bool NULL,
	color int2 NULL,
	CONSTRAINT pk_message PRIMARY KEY (id),
	CONSTRAINT fk_message FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Drop table

-- DROP TABLE public."following";

CREATE TABLE public."following" (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	follow_user_id uuid NULL,
	CONSTRAINT fk_following_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
