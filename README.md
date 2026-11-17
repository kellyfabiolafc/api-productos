
# API Productos - Tienda Perú

## Descripción

Proyecto de una API REST desarrollada con Node.js, Express y MySQL para administrar productos, clientes y proveedores de una tienda.

## Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- MySQL
- Git y GitHub

## Funcionalidades

La API permite realizar las siguientes operaciones:

- Listar registros
- Obtener un registro por ID
- Crear nuevos registros
- Actualizar registros
- Eliminar registros

Estas operaciones están disponibles para productos, clientes y proveedores.

## Base de datos

La base de datos se llama `tiendaperu`.

Contiene las siguientes tablas:

- `productos`
- `clientes`
- `proveedores`

Se agregaron 3 registros de prueba en las tablas clientes y proveedores.

## Rutas de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/productos | Listar productos |
| GET | /api/clientes | Listar clientes |
| GET | /api/proveedores | Listar proveedores |
| GET | /api/clientes/:id | Buscar cliente |
| POST | /api/clientes | Crear cliente |
| PUT | /api/clientes/:id | Actualizar cliente |
| DELETE | /api/clientes/:id | Eliminar cliente |

Las mismas operaciones se pueden realizar con productos y proveedores.

## Instalación

1. Clonar o descargar el repositorio.
2. Abrir el proyecto en Visual Studio Code.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear la base de datos `tiendaperu` en MySQL e importar los archivos SQL.

5. Crear el archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tiendaperu
DB_CONNECTION_LIMIT=10
```

6. Ejecutar el servidor:

```bash
node src/server.js
```

7. Probar la API:

http://localhost:3000/api/productos

http://localhost:3000/api/clientes

http://localhost:3000/api/proveedores

## Git y GitHub

Se utilizó Git para controlar los cambios realizados y GitHub para almacenar el repositorio.

El archivo `.gitignore` evita subir:

- `node_modules`
- `.env`

## Autor

Kelly Fabiola FC

Proyecto académico - SENATI
