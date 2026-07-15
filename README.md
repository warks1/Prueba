# Dime quién canta — v6.0 Stable Audio Core

Esta versión conserva los modos, perfil, carrera, colección, eventos, tienda, ranking, logros y guardado local de la beta anterior, pero cambia el sistema musical.

## Cambio principal

Las canciones ya no se buscan durante cada ronda. El workflow de GitHub genera `catalog-cache.json` con previews oficiales verificadas. El juego carga ese archivo al entrar, filtra pistas inválidas y precarga la siguiente ronda.

## Publicación

Sube **todo el contenido** de esta carpeta a la raíz del repositorio, incluyendo `.github/workflows/refresh-catalog.yml` y `scripts/build-catalog.mjs`. Después abre la pestaña **Actions** y ejecuta `Actualizar catálogo musical`. El workflow también se ejecuta automáticamente tras subir los archivos y una vez al día.

La primera ejecución debe dejar `catalog-cache.json` con canciones. La página mostrará `STABLE AUDIO v6.0` en la cabecera.

## Nota legal

El paquete no contiene grabaciones comerciales. Las URLs se obtienen de previews oficiales disponibles públicamente. Para una publicación comercial definitiva deben revisarse las condiciones vigentes y las licencias necesarias.
