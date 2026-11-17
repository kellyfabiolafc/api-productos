CREATE DATABASE tiendaperu;

USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(120) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    update_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO productos
(marca, descripcion, precio, stock)
VALUES
('Samsung', 'TV 55', 2500.00, 10),
('LG', 'Lavadora', 1200, 3),
('Sony', 'Playstation 5', 3200, 2);

SELECT * FROM productos;

-- Ampliación de la BD existente tiendaperu: NO elimina las tablas anteriores.
CREATE TABLE IF NOT EXISTS clientes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos VARCHAR(120) NOT NULL,
    nombres VARCHAR(120) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    email VARCHAR(150) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS proveedores (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial VARCHAR(150) NOT NULL,
    contacto VARCHAR(120) NOT NULL,
    ruc VARCHAR(11) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL
) ENGINE=InnoDB;

-- Registros de prueba: ejecutar una sola vez para evitar duplicados.
INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES
('García López', 'Ana María', '987654321', 'Av. Lima 123, Lima', 'ana.garcia@example.com'),
('Torres Rojas', 'Luis Alberto', '912345678', 'Jr. Arequipa 456, Chincha', 'luis.torres@example.com'),
('Flores Díaz', 'Rosa Elena', '923456789', 'Av. Grau 789, Ica', 'rosa.flores@example.com');

INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES
('Distribuidora Andina SAC', 'Carlos Mendoza', '20123456789', 'Av. Perú 210, Lima'),
('Tecnología del Sur EIRL', 'María Salazar', '20567891234', 'Jr. Comercio 350, Arequipa'),
('Suministros del Pacífico SAC', 'Jorge Paredes', '20654321987', 'Av. Industrial 890, Callao');

SELECT * FROM clientes;
SELECT * FROM proveedores;
