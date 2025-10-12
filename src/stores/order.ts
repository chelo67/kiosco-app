import type { OrderItem, SelectedProduct } from '@/types'
import { toLowerFirstChar } from '@/utils'
import {create} from 'zustand'

type Store = {
    isOrderDrawerOpen: boolean
    toggleOrderDrawer: () => void
    order: OrderItem[]
    addItem: (product : SelectedProduct ) => void
    deleteItem: (product: OrderItem) => void
    increaseQuantity: (product: OrderItem) => void
    decreaseQuantity: (product: OrderItem) => void
}

export const useOrderStore = create<Store>()((set, get) => ({
    isOrderDrawerOpen: false,
    toggleOrderDrawer: () => {
        set((state) => ({ isOrderDrawerOpen: !state.isOrderDrawerOpen}))
    },
    order: [],
    addItem: (product) => {

        const currentOrder = get().order

        //revisar si el producto es variable
        const hasSize = Boolean(product.size)
        const key = hasSize ? `${product.id}-${toLowerFirstChar(product.size!)}`  : undefined

        //Encontrar el producto duplicado
        const isMatch = (item: OrderItem) => hasSize ? item.key === key : item.id === product.id
        const existingItem = currentOrder.find(isMatch)

        let order : OrderItem[]
        if(existingItem) {
            order = currentOrder.map(item =>
                isMatch(item)
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                    : item
            )
        } else {
            const newItem = {
            ...product,
            quantity: 1,
            subtotal: product.price,
            key
        }
            order = [...currentOrder, newItem] 
        }

        
        set({order})

        console.log(get().order)
    },
    deleteItem: (product) => {
        const order = get().order.filter(item =>
            product.key ? item.key !== product.key : item.id !== product.id
        )
        set({order})
    },
    increaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id

        const order = get().order.map(item =>
            isMatch(item) ?
            {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }
            : item
        )
        set({order})
    },

    decreaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id

        const order = get().order.map(item =>
            isMatch(item) ?
            {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            }
            : item
        )
        set({order})
    }
}))