CREATE schema test;

CREATE TABLE test."User" (
	id serial4 NOT NULL,
	avatar text NULL,
	createat_at timestamp(3) NULL,
	email text NOT NULL,
	firs_name text NOT NULL,
	last_name text NOT NULL,
	middle_name text NOT NULL,
	nickname text NOT NULL,
	"password" text NOT NULL,
	sity text NULL,
	skills text NULL,
	update_at timestamp(3) NULL,
	"work" text NULL,
	CONSTRAINT "User_pkey" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "User_email_key" ON test."User" USING btree (email);
CREATE UNIQUE INDEX "User_nickname_key" ON test."User" USING btree (nickname);

CREATE TABLE test."Credit_card" (
	id serial4 NOT NULL,
	"userId" int4 NULL,
	bank text NOT NULL,
	"valid" bool NOT NULL,
	CONSTRAINT "Credit_card_pkey" PRIMARY KEY (id),
	CONSTRAINT "Credit_card_userId_fkey" FOREIGN KEY ("userId") REFERENCES test."User"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE test."_prisma_migrations" (
	id varchar(36) NOT NULL,
	checksum varchar(64) NOT NULL,
	finished_at timestamptz NULL,
	migration_name varchar(255) NOT NULL,
	logs text NULL,
	rolled_back_at timestamptz NULL,
	started_at timestamptz NOT NULL DEFAULT now(),
	applied_steps_count int4 NOT NULL DEFAULT 0,
	CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY (id)
);