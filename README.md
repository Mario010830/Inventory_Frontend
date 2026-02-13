# Sistema de administración de inventario (Frontend)

React + TypeScript + Vite + Tailwind CSS. Estructura base lista para desarrollar según `FRONTEND_FLOWS_AND_VIEWS.md`.

## Cómo arrancar

- **Desarrollo:** `npm run dev`
- **Build:** `npm run build`
- **Variables de entorno:** copia `.env.example` a `.env` y define `VITE_API_BASE_URL` (URL base del API).

## Estructura de carpetas

- `src/api` — Cliente HTTP (Axios), interceptores (auth/refresh)
- `src/config` — Variables de entorno
- `src/constants` — Rutas de la app y prefijos del API
- `src/features` — Módulos por dominio: auth, users, categories, products, inventory, movements, suppliers, settings, logs, dashboard
- `src/styles` — Tema y estilos base (Tailwind @theme, variables)
- `src/store` — Estado global (Zustand, p. ej. auth)
- `src/routes` — Configuración de React Router y layout raíz
- `src/types` — Tipos compartidos (respuestas API, etc.)
- `src/components`, `src/layouts`, `src/hooks`, `src/utils` — Componentes, layouts, hooks y utilidades compartidas

Los estilos están centralizados en `src/styles/theme.css` (tokens) y `src/styles/base.css` (base global). Usa el alias `@/` para importar desde `src/`.

**Auth y API:** `docs/AUTH_AND_API.md` describe cómo conectar login/register/forgot-password con el backend y buenas prácticas de seguridad.

---

## React + TypeScript + Vite (template)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
