import { useOrderStore } from "@/stores/order"
import ProductDetails from "./ProductDetails"

export default function OrderContents() {

    const {order} = useOrderStore()

  return (
    <>
        {order.length === 0 ? 
        <p className="text-center my-10 text-xl">El pedido esta vacio</p> 
        : 
            <>
                <h2 className="text-2xl font-bold text-gray-900">Ajusta tu pedido</h2>
                {order.map( item => {
                    return (
                        <ProductDetails 
                            item={item}
                        />
                    )
                })}
            </>
        }
    </>
  )
}
