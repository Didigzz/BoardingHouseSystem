// Role-based guards for authorization

export type UserRole = 'LANDLORD' | 'BOARDER' | 'ADMIN';

export function isLandlord(role?: string): boolean {
    return role === 'LANDLORD';
}

export function isBoarder(role?: string): boolean {
    return role === 'BOARDER';
}

export function isAdmin(role?: string): boolean {
    return role === 'ADMIN';
}

export function hasRole(userRole: string | undefined, allowedRoles: UserRole[]): boolean {
    if (!userRole) return false;
    return allowedRoles.includes(userRole as UserRole);
}
