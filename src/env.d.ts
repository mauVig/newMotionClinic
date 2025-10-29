interface ImportMetaEnv {
    readonly RESEND_APIKEY_EMAIL: string;
}

interface ImportMetaEnv {
    readonly EMAIL_SERVICE_ID: string;
    readonly EMAIL_TEMPLATE_ID: string;
    readonly EMAIL_PUBLIC_KEY: string;
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}