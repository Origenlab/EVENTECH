# EVENTECH V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generar, validar, cargar y activar 200 articulos EVENTECH V2 y cinco campanas RankerX.

**Architecture:** Un generador determinista produce 200 JSON con combinaciones unicas de servicio, audiencia, intencion y arquitectura. Un validador independiente comprueba calidad, diversidad, HTML, spintax y prohibiciones. La automatizacion del navegador carga el corpus y configura las campanas mediante el SOP ya validado.

**Tech Stack:** Node.js, JSON, HTML con spintax, RankerX local.

## Global Constraints

- Cero enlaces o URLs dentro de los articulos.
- Cero contenido inventado.
- Money site unico: `https://maps.app.goo.gl/TfqvVCgHpzxw6q448`.
- Duracion de cada campana: 30 dias.

### Task 1: Corpus y validador

- [ ] Crear el validador V2 con pruebas de cantidad, unicidad, profundidad, spintax, HTML y terminos prohibidos.
- [ ] Crear el generador basado en servicios verificados de EVENTECH.
- [ ] Generar 200 archivos y manifiesto.
- [ ] Ejecutar la validacion completa y corregir cualquier fallo.

### Task 2: Carga RankerX

- [ ] Crear un grupo profesional independiente.
- [ ] Cargar 200 articulos sin sobrescrituras.
- [ ] Verificar contador, numeros unicos y fallos.

### Task 3: Cinco campanas

- [ ] Crear X-Wizard base con destino unico, grupos en ambos tiers, imagenes 2-4 y 30 dias.
- [ ] Crear cinco campanas con familias semanticas distintas.
- [ ] Verificar cinco filas activas en la tabla de campanas.

### Task 4: Memoria operativa

- [ ] Registrar IDs, nombres, configuracion, validaciones e incidencias en el vault EVENTECH y el log maestro.
