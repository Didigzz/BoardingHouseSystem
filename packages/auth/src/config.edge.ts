import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible auth config (no DB access)
 * Used by middleware for session validation only
 */
export const authConfigEdge: NextAuthConfig = {
    providers: [], // No providers - just for session validation
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.status = (user as any).status;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).status = token.status;
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
