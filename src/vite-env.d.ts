/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: '1006184430642-86pdk6sui97e56qgtrsgkc6e39f7hcdu.apps.googleusercontent.com';
  readonly VITE_API_BASE_URL: "http://localhost:8000";
  readonly VITE_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
