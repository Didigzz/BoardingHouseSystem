export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  transaction<T>(callback: (db: any) => Promise<T>): Promise<T>;
}