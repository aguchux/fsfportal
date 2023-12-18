
/**
 * Converts a number to a currency string
 * @param amount The number to convert
 * @param currency The currency to use
 * @returns The currency string
 */
export const toMoney = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}