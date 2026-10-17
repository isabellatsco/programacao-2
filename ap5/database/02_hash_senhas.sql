CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE sys_user SET password = crypt(password, gen_salt('bf', 10));
