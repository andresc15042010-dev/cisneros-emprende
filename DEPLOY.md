# Guía de Despliegue en Vercel (Hobby Free Tier) • Cisneros Emprende

Esta guía detalla el procedimiento paso a paso para desplegar la Progressive Web App **Cisneros Emprende** en Vercel de forma 100% gratuita.

---

## 1. Requisitos Previos

- Cuenta gratuita en [Vercel](https://vercel.com).
- Cuenta en GitHub con acceso al repositorio del proyecto (ndresc15042010-dev/cisneros-emprende).
- Proyecto de Supabase activo (https://qopvmadvijnjgzgxwjpe.supabase.co).

---

## 2. Pasos para el Despliegue

### Paso 1: Importar Repositorio en Vercel
1. Inicia sesión en tu cuenta de Vercel.
2. Haz clic en el botón ** Add New...** y selecciona **Project**.
3. En la lista de repositorios de GitHub, busca y selecciona **cisneros-emprende** (si es privado, asegúrate de haber concedido permisos de lectura a la aplicación Vercel GitHub).
4. Haz clic en **Import**.

### Paso 2: Configuración del Proyecto
1. **Framework Preset**: Selecciona **Vite** u **Other** (si se despliega como SPA estática con index.html).
2. **Root Directory**: Si el repositorio contiene el código en la raíz, déjalo como ./ o ./proyecto_9 si importaste el workspace completo.
3. **Build Command**: 
pm run build (o déjalo vacío si es entrega estática HTML/PWA directa).
4. **Output Directory**: dist (para Vite) o ./ (para HTML directo).

### Paso 3: Configurar Variables de Entorno (Environment Variables)
En la sección **Environment Variables**, añade las siguientes variables:

| Nombre de Variable | Valor |
| :--- | :--- |
| NEXT_PUBLIC_SUPABASE_URL | https://qopvmadvijnjgzgxwjpe.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | sb_publishable_AVcBF5PDKQ5oS2FYsCYzLw__Hqd8Hkz |
| VITE_SUPABASE_URL | https://qopvmadvijnjgzgxwjpe.supabase.co |
| VITE_SUPABASE_ANON_KEY | sb_publishable_AVcBF5PDKQ5oS2FYsCYzLw__Hqd8Hkz |

> ⚠️ **Seguridad**: La anon key es una clave **publishable** diseñada para el cliente frontend. Nunca añadas la service_role key en Vercel.

### Paso 4: Desplegar
1. Haz clic en **Deploy**.
2. Vercel procesará la compilación y asignará automáticamente una URL con HTTPS y certificado SSL gratuito:
   https://cisneros-emprende.vercel.app (o nombre similar).

---

## 3. Configurar Redirecciones de Supabase Auth

1. Ve a tu panel de Supabase: [https://supabase.com/dashboard/project/qopvmadvijnjgzgxwjpe](https://supabase.com/dashboard/project/qopvmadvijnjgzgxwjpe).
2. Dirígete a **Authentication > URL Configuration**.
3. En **Site URL**, coloca la URL generada por Vercel:
   https://cisneros-emprende.vercel.app
4. En **Redirect URLs**, añade:
   - https://cisneros-emprende.vercel.app/**
   - http://localhost:5173/** (para desarrollo local)
5. Guarda los cambios.

---

## 4. Instalación de la PWA en Dispositivos

1. **Android (Chrome)**: Abre la URL de Vercel > Menú (tres puntos) > *Instalar aplicación* o *Añadir a pantalla de inicio*.
2. **iOS (Safari)**: Abre la URL > Botón Compartir > *Añadir a pantalla de inicio*.
3. **PC / Mac (Chrome/Edge)**: Haz clic en el ícono de instalar en la barra de direcciones del navegador.

¡Listo! Cisneros Emprende operará con caché offline, mini-carro de WhatsApp y sincronización con Supabase en tiempo real.
