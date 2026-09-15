# Ecosistema de Agentes y Habilidades • Cisneros Emprende

Sistema multi-agente y catálogo de habilidades estructurado para la gobernanza, desarrollo y mantenimiento continuo de la plataforma **Cisneros Emprende**.

---

## 1. Agentes Especializados

Ubicados en .agents/agents/:

| Agente | Modelo | Rol Principal | Herramientas Clave |
| :--- | :--- | :--- | :--- |
| **orchestrator** | gemini-3-pro | Líder del proyecto: descomposición de tareas, delegación, integración y control global de calidad. | iew_file, eplace_file_content, un_command, manage_task |
| **rontend-agent** | gemini-3.6-flash | UI/UX, React, Tailwind CSS, PWA, accesibilidad (WCAG AA), mobile-first y rendimiento. | iew_file, eplace_file_content, un_command, rowser_automation |
| **ackend-agent** | gemini-3.6-flash | Supabase, PostgreSQL, políticas RLS, Edge Functions en Deno y Storage. | iew_file, eplace_file_content, un_command |
| **qa-agent** | gemini-3.6-flash | Auditoría de pruebas, validación RLS, Core Web Vitals, pruebas de enlaces wa.me y PWA. | iew_file, eplace_file_content, un_command, rowser_automation |

---

## 2. Catálogo de Habilidades (Skills)

Ubicadas en .agents/skills/ con formato estándar SKILL.md:

- **Orquestación & Calidad**: project-architecture, 	ask-decomposition, code-review, git-workflow.
- **Frontend & PWA**: rontend-development, eact-development, 	ailwind-css, pwa-development, esponsive-design, ccessibility-a11y, performance-optimization.
- **Backend & Base de Datos**: ackend-development, database-design, supabase-development, postgresql, ls-policies, security-best-practices.
- **Testing & Auditoría**: 	esting-qa, unit-testing, e2e-testing, ccessibility-testing, performance-testing.

---

## 3. Reglas de Oro del Proyecto

1. **Seguridad Server-Side**: Toda la seguridad se aplica en base de datos mediante **Row Level Security (RLS)**. Prohibido depender de protecciones cosméticas en el frontend.
2. **Claves Seguras**: Nunca exponer service_role en el cliente. Solo se permite non / publishable key.
3. **Localización y Moneda**: Interfaz 100% en español colombiano (es-CO), moneda en pesos colombianos (COP), horarios sincronizados con America/Bogota (UTC-5).
4. **Zero-Maps**: Queda prohibido el uso de librerías de mapas pesados. Las direcciones se manejan de forma escrita y contextual (written_address + eference_point).
5. **Anti-Spam Estricto**: Restricción única de 1 reseña por usuario y negocio (UNIQUE(business_id, user_id)).

---

## 4. Comandos Slash Recomendados

- **/goal**: Para delegar misiones autónomas completas de inicio a fin al orchestrator.
- **/boost**: Para tareas complejas que demanden pensamiento estratégico profundo y revisión multidimensional.
- **/teamwork-preview**: Para coordinar equipos de agentes concurrentes trabajando en paralelo.
- **/browser**: Para automatización y verificación visual directa de la PWA.
- **/learn**: Para persistir nuevos patrones y configuraciones descubiertas en el proyecto.
