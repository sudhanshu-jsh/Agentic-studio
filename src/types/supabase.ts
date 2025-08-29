// Empty types file - Supabase removed
export type Database = {};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
export type Tables<T extends keyof Database> = Database[T] extends {
  Row: infer R;
}
  ? R
  : never;
export type TablesInsert<T extends keyof Database> = Database[T] extends {
  Insert: infer I;
}
  ? I
  : never;
export type TablesUpdate<T extends keyof Database> = Database[T] extends {
  Update: infer U;
}
  ? U
  : never;
