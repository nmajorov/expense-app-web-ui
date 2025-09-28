
/**
 * represent Expense types in backend
 */
export type Expense = {
    id: Number;
    description: string;
    createdAT: string;
    amount: Number;
    UpdatedAt?: string; // (last modified date)
}
