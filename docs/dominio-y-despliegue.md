# Dominio canónico: orden de los cambios

El dominio canónico del sitio es **`syxestudio.es`**, sin `www`. Es lo que
declaran los `canonical` de `src/components/SEOHead.tsx`, el `sitemap.ts` y el
`robots.ts`.

## Cuidado: hay un orden obligatorio

`vercel.json` contiene una redirección 308 de `www.syxestudio.es` al dominio
limpio. El panel de Vercel, por su parte, puede tener configurada una
redirección propia en sentido contrario (apex → www), que es como estaba el
proyecto hasta ahora y que emite un 307.

Si las dos existen a la vez, se produce un **bucle de redirección** y el sitio
deja de cargar:

```
apex  --307 (panel)-->  www
www   --308 (vercel.json)-->  apex
apex  --307 (panel)-->  www        ...
```

Por eso el cambio del panel va **antes** del despliegue:

1. En Vercel, *Settings → Domains*, en `syxestudio.es`: quitar el
   "Redirect to www.syxestudio.es" y dejarlo como dominio de producción.
2. Comprobar que `www.syxestudio.es` sigue asignado al proyecto como dominio
   normal, **no** como "Redirect to". La regla de `vercel.json` solo se aplica
   si la petición llega de verdad al proyecto; si el panel la redirige antes,
   nunca se ejecuta.
3. Solo entonces, desplegar.

Si el proyecto despliega automáticamente al hacer push a `main`, el paso 1
tiene que estar hecho **antes** del push.

Entre los pasos 2 y 3 los dos hosts sirven el mismo contenido durante un rato.
Es contenido duplicado temporal y es inofensivo; un bucle de redirección no.

## El patrón de la ruta: `/:path*` no vale aquí

Con `trailingSlash: true`, **todas** las URL canónicas del sitio terminan en
barra. Y `source: "/:path*"` no casa con rutas terminadas en barra, ni con la
raíz. Resultado: la primera versión de esta redirección no se aplicaba a
ninguna página real, aunque la condición de host sí funcionaba.

Medido en producción con la regla antigua:

```
www/el-estudio   -> 308 al apex     (sin barra: casa)
www/el-estudio/  -> 200             (con barra: NO casa)
www/noexiste     -> 308 al apex     (sin barra: casa)
www/noexiste/    -> 404             (con barra: NO casa)
www/             -> 200             (raíz: NO casa)
```

Que `/noexiste` también redirigiera descarta que tenga algo que ver con que el
fichero exista: el único discriminante es la barra final.

La forma correcta es `source: "/:path(.*)"`, donde el grupo `(.*)` captura
cualquier carácter, barras incluidas, y también la cadena vacía de la raíz. El
ejemplo de la documentación de Vercel usa `/:path*` porque asume un proyecto
sin `trailingSlash`.

Por el mismo motivo `/servicios` y `/servicios/` necesitan **dos reglas
separadas**: una no cubre a la otra.

## Por qué 308 y no el 307 del panel

La opción "Redirect to another domain" del panel de Vercel emite siempre un 307
temporal y no tiene conmutador para 308. Un 307 le indica a los buscadores que
la redirección es provisional, así que no consolidan las señales de
posicionamiento en el destino. Para fijar un host canónico hace falta una
redirección permanente, y de ahí el `"permanent": true` del `vercel.json`.

## Verificación posterior

```bash
# Debe responder 308 y apuntar al dominio sin www
curl -sS -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.syxestudio.es/

# Debe responder 200 directamente, sin saltos
curl -sS -o /dev/null -w "%{http_code}\n" https://syxestudio.es/

# El canonical debe coincidir con el host servido
curl -sS https://syxestudio.es/ | grep -o 'rel="canonical" href="[^"]*"'
```

## Pendiente: el aviso de DNS en www

Vercel marca `www.syxestudio.es` con "DNS Change Recommended". El motivo es que
el `CNAME` apunta al valor antiguo `cname.vercel-dns.com`, mientras que ahora
cada proyecto tiene su propio destino (del estilo
`xxxxxxxx.vercel-dns-017.com`). El apex ya usa las IP nuevas del rango
`64.29.17.x`, y esa asimetría es la que dispara el aviso.

El DNS lo gestiona Vercel —los nameservers del dominio son `ns1.vercel-dns.com`
y `ns2.vercel-dns.com`—, así que se corrige en el propio panel, sin tocar el
registrador. El valor exacto hay que leerlo en "View DNS configuration" del
panel: es específico de este proyecto y no se debe copiar de otro sitio.

No es urgente: la configuración actual es válida y el sitio resuelve bien.
