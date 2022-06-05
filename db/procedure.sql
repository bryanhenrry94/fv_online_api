USE fv_online;

DELIMITER $$
USE `fv_online`$$

DELIMITER $$
CREATE PROCEDURE `sp_formulario`(
  IN _documento VARCHAR(13),
  IN _tipo CHAR(1),
  IN _tipoid CHAR(1), 
  IN _email_cliente VARCHAR(100), 
  IN _estado CHAR(1), 
  IN _cliente CHAR(15), 
  IN _esbroker CHAR(1), 
  IN _email_broker VARCHAR(100)
)
BEGIN 

DECLARE _hash TEXT;
DECLARE _count INT;

SET _hash = SHA(_documento);

SELECT count(*) INTO _count FROM formulario WHERE documento = _documento;

IF _count = 0 THEN
	INSERT INTO formulario (documento, tipo, tipoid, email_cliente, estado, cliente, esbroker, email_broker, hash)
	VALUES (_documento, _tipo, _tipoid, _email_cliente, _estado, _cliente, _esbroker, _email_broker, _hash);
ELSE
	UPDATE formulario 
    SET tipo = _tipo, tipoid = _tipoid, email_cliente = _email_cliente, estado = _estado, cliente = _cliente, esbroker = _esbroker, email_broker = _email_broker, hash = _hash
	WHERE documento = _documento;
END IF;

SELECT hash FROM formulario WHERE documento = _documento;

END$$
DELIMITER ;
