# Plataforma de Gestión Académica

Este proyecto corresponde al desarrollo de una **plataforma web para la gestión académica**, la cual permite administrar cursos, módulos, lecciones, docentes y administrativos.  

El sistema fue desarrollado como parte de un ejercicio académico y funciona como un **MVP (Producto Mínimo Viable)** orientado a la organización de información educativa.

---

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando tecnologías web básicas:

- HTML5
- CSS3
- JavaScript
- LocalStorage (almacenamiento en el navegador)

No se utilizan frameworks ni bases de datos externas.

---

## Funcionalidades del sistema

### Panel principal

El panel principal permite visualizar información general del sistema, como:

- Número de cursos registrados
- Número de módulos creados
- Número de lecciones
- Número de docentes registrados
- Actividad reciente del sistema
- Gráfica de estadísticas

---

### Gestión de Cursos

Permite administrar los cursos disponibles en la plataforma.

Funciones:

- Crear cursos
- Visualizar cursos
- Editar cursos
- Eliminar cursos

---

### Gestión de Módulos

Los módulos pertenecen a un curso específico.

Funciones:

- Crear módulos
- Visualizar módulos
- Editar módulos
- Eliminar módulos

---

### Gestión de Lecciones

Las lecciones pertenecen a un módulo específico.

Funciones:

- Crear lecciones
- Visualizar lecciones
- Editar lecciones
- Eliminar lecciones

---

### Gestión de Docentes

Permite administrar los docentes del sistema.

Datos gestionados:

- Código
- Identificación
- Nombres
- Apellidos
- Email
- URL de la foto
- Área académica

Funciones:

- Crear docentes
- Visualizar docentes
- Editar docentes
- Eliminar docentes

---

### Gestión de Administrativos

Permite administrar los usuarios administrativos del sistema.

Datos gestionados:

- Identificación
- Nombres
- Apellidos
- Email
- Teléfono
- Cargo

Funciones:

- Crear administrativos
- Visualizar administrativos
- Editar administrativos
- Eliminar administrativos

---

## Restricciones del sistema

- Un **docente no puede ser eliminado si está asociado a un curso**.
- La plataforma se encuentra en fase **MVP**, por lo que solo se utiliza almacenamiento local.
- Los cursos pueden ser visualizados públicamente.

---

## Estructura del proyecto
