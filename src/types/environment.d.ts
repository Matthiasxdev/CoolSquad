export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_KEY :string
    NEXT_PUBLIC_SUPABASE_BUCKET :string
    //   DB_PORT: number;
    //   DB_USER: string;
    //   ENV: 'test' | 'dev' | 'prod';
    }
  }
}