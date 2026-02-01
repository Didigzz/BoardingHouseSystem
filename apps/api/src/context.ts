import { db } from "@bhms/database";

/**
 * Creates context for oRPC requests
 * This includes database client, session, and tenant information
 */
export async function createContext({ req, res }: any): Promise<{
  db: typeof db;
  session: any;
  tenantId: any;
  req: any;
  res: any;
}> {
  // Extract session from headers (set by auth middleware)
  const session = (req as any).session || null;
  
  // Extract tenant ID from session or headers
  const tenantId = session?.user?.tenantId || req.headers["x-tenant-id"];

  return {
    db,
    session,
    tenantId,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
