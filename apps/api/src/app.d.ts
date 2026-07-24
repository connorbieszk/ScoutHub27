// apps/api/src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      session: Session | null;
      member: { id: string; name: string; role: string; niceName: string; } | null;
    }
  }
}
export {};
