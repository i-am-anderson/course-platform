declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_ORIGIN: string;
    }
  }
}

export {}