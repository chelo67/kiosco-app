import type { OrderItem } from "@/types"

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toLowerFirstChar(str: string) {
    return str.charAt(0).toLowerCase()
}

export const calculateTotal = (order: OrderItem[]) => order.reduce((total, item) => total + (item.quantity * item.price)  ,0)