# 🌿 Cisneros Emprende • Directorio Digital & PWA

Plataforma digital y Progressive Web App (PWA) de directorio, vitrina comercial y gestión para emprendimientos y negocios locales del municipio de **Cisneros, Antioquia, Colombia**.

Diseñado bajo una arquitectura **100% gratuita en su nivel Free Tier** con **Supabase (PostgreSQL)**, **Tailwind CSS**, **PWA Nativa** y despliegue en **Vercel / Netlify**.

---

## 🎯 Características Principales

1. **Directorio y Vitrina Comercial Mobile-First:**
   - Visualización ágil de comercios divididos por categorías típicas de Cisneros (Gastronomía, Cafés & Trapiches, Comercio, Artesanías, Servicios y Turismo).
   - **Carruseles táctiles deslizables** para fotos del local y productos (sin consumir datos móviles de video).
   - **Direcciones estrictamente descriptivas por texto** (ej: *"Calle 19 # 20-14, diagonal a la Estación del Ferrocarril"*), evitando mapas pesados o interactivos.

2. **Mini-Carro de Compras para WhatsApp:**
   - Carrito local intuitivo en el menú del negocio.
   - Genera automáticamente un enlace directo a `wa.me/57...` con desglose de productos, cantidades, subtotal, costo de domicilio, dirección exacta y método de pago.

3. **Sello "Orgullo Cisneros" 🏅:**
   - Distintivo dorado otorgado automáticamente en base de datos a comercios con calificación promedio $\ge 4.6$, mínimo 5 reseñas verificadas y alta preferencia de la comunidad.

4. **Estado "Abierto / Cerrado" en Tiempo Real:**
   - Calculado dinámicamente contrastando el horario configurado en el negocio contra la hora oficial de Colombia (`America/Bogota`).

5. **Seguridad y Anti-Spam en el Servidor (Row Level Security):**
   - **Regla de Oro:** Exactamente **1 reseña por cuenta de Google** por negocio (`UNIQUE (business_id, user_id)`), impidiendo spam o auto-calificaciones múltiples.
   - Políticas RLS estrictas en PostgreSQL para que los emprendedores solo puedan modificar su propio negocio.

6. **Panel Secreto de Administradora (Cami):**
   - Detección automática del correo de Cami como rol `admin`.
   - Aprobación o rechazo de negocios nuevos (nacen en estado *Pendiente*).
   - Elección del *Negocio Destacado de la Semana* (banner superior).
   - Gestión y lectura del *Buzón de Sugerencias* y *Reportes Ciudadanos*.

---

## 🚀 Despliegue en 3 Pasos (100% Gratuito)

### Paso 1: Configurar Supabase (Base de Datos & Auth)
1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Ve al **SQL Editor** y pega todo el contenido del archivo [`supabase/schema.sql`](file:///a:/copia/Documentos/PROYECTOS/proyecto_9/supabase/schema.sql). Haz clic en **Run**.
3. En **Authentication > Providers**, activa **Google** agregando tu Client ID y Client Secret de Google Cloud Console.
4. En **Storage**, los buckets `business-images` y `review-evidence` se crean automáticamente con políticas de lectura pública.

### Paso 2: Desplegar en Vercel o Netlify
1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
2. Configura las variables de entorno en el panel de hosting:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
   ```
3. Haz clic en **Deploy**. ¡Tu PWA estará viva en la web con HTTPS y dominio gratuito `.vercel.app`!

### Paso 3: Probar en Celular e Instalar como App
1. Abre el enlace en tu celular (Chrome en Android o Safari en iPhone).
2. En Android: Pulsa en el menú (tres puntos) > **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
3. En iOS: Pulsa el botón de Compartir > **"Agregar al inicio"**.
4. La app se instalará en el celular con su ícono propio, pantalla completa y soporte offline gracias al Service Worker [`public/sw.js`](file:///a:/copia/Documentos/PROYECTOS/proyecto_9/public/sw.js).

---

## 📂 Estructura del Código

```
proyecto_9/
├── supabase/
│   ├── schema.sql                 # Tablas, RLS, Triggers y Vista Orgullo Cisneros
│   └── functions/
│       └── notify-suggestion/     # Supabase Edge Function (Deno) para correos
├── public/
│   ├── manifest.json              # Manifiesto PWA para instalación
│   ├── sw.js                      # Service Worker con caché inteligente
│   └── icons/                     # Íconos SVG 192px y 512px
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Barra con logo, buscador y accesos
│   │   ├── BusinessCard.jsx       # Tarjeta con carrusel y sello Orgullo Cisneros
│   │   ├── TouchCarousel.jsx      # Carrusel táctil ligero para fotos
│   │   ├── BusinessDetail.jsx     # Vista detallada, menú y reseñas
│   │   ├── MiniCart.jsx           # Carrito local y pedido WhatsApp
│   │   ├── ReviewFormModal.jsx    # Modal de 1 reseña por cuenta Google
│   │   ├── SuggestionModal.jsx    # Buzón de sugerencias ciudadano
│   │   ├── ReportModal.jsx        # Reportar información errónea
│   │   ├── RegisterBusinessModal.jsx # Registro de nuevos emprendedores
│   │   └── AdminDashboard.jsx     # Panel de control de Cami
│   ├── lib/
│   │   ├── supabase.js            # Cliente Supabase JS
│   │   ├── schedule.js            # Lógica de cálculo "Abierto/Cerrado" hora Colombia
│   │   ├── whatsapp.js            # Formateador del enlace wa.me
│   │   └── imageCompressor.js     # Compresión en canvas de fotos antes de subir
│   └── styles/
│       └── globals.css            # Tailwind CSS con paleta Verde/Naranja
├── index.html                     # PWA interactiva completa y lista para ejecutar
├── package.json                   # Dependencias y scripts
└── README.md                      # Esta documentación
```

---

## 🛠️ Ejecución Local Inmediata

Puedes abrir directamente el archivo [`index.html`](file:///a:/copia/Documentos/PROYECTOS/proyecto_9/index.html) en cualquier navegador moderno o servirlo con cualquier servidor local:

```bash
# Opción A: Abrir directamente en el navegador
start index.html

# Opción B: Ejecutar con Node o Vite
npm install
npm run dev
```
