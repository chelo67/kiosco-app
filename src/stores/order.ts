import type { OrderItem, SelectedProduct } from '@/types'
import { toLowerFirstChar } from '@/utils'
import {create} from 'zustand'

type Store = {
    isOrderDrawerOpen: boolean
    toggleOrderDrawer: () => void
    order: OrderItem[]
    addItem: (product : SelectedProduct ) => void
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

        const newItem = {
            ...product,
            quantity: 1,
            subtotal: product.price,
            key
        }
        const order = [...currentOrder, newItem] 
        set({order})

        console.log(get().order)
    }
}))