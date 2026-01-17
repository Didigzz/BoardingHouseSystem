import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible auth config (no DB access)
 * Used by middleware for session validation only
 */
export const authConfigEdge: NextAuthConfig = {
    providers: [], // No providers - just for session validation
    trustHost: true, // Required for development without HTTPS
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
        authorized({ auth }) {
            return true; // Let middleware handle authorization
        },
    },
    pages: {
        signIn: '/login',
    },
};
