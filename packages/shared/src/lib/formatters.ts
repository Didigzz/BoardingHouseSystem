/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency = 'PHP'): string {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency,
    }).format(amount);
}