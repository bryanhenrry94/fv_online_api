CREATE DATABASE IF NOT EXISTS fw_online;

USE fw_online;

CREATE TABLE formulario (
  documento varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  tipo char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  tipoid char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  email_cliente varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  estado char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  cliente varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  esbroker char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  email_broker varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  hash text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (documento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
