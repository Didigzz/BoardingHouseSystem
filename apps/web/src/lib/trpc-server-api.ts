import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "./trpc-server";
import { createTRPCContext } from "@bhms/api";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const api = cache(createCaller(createContext));
