import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { appRouter, createORPCContext } from "./orpc-server";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-orpc-source", "rsc");

  return createORPCContext({
    headers: heads,
  });
});

export const api = cache(() => appRouter);