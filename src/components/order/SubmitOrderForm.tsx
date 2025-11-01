import { useOrderStore } from "@/stores/order"
import { actions, isActionError } from "astro:actions"
import { toast } from "react-toastify"

function isInputError(error: any): error is { issues: { message: string }[] } {
  return Boolean(error && Array.isArray((error as any).issues))
}

export default function SubmitOrderForm() {

  const {order} = useOrderStore()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('name')?.toString() ?? ''

        const {data, error} = await actions.orders.createOrder({name, order})

        const inputErrors = isInputError(error) ? error.issues : []
        if(error && inputErrors.length) {
          inputErrors.forEach(error => toast.error(error.message))
          return
        }

        const actionError = isActionError(error) ? error.message : null

        if(actionError) {
          toast.error(actionError)
          return
        }
    }

  return (
    <form className="mt-5" onSubmit={ handleSubmit }>
      <div className="space-y-3">
        <label htmlFor="name" className="font-bold text-lg">Tu Nombre:</label>

        <input 
          type="text" 
          id="name"
          name="name"
          placeholder="Coloca tu Nombre"
          className="border border-gray-300 p-2 w-full rounded-xl"
        />
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-xl py-3 mt-5 text-lg font-bold uppercase cursor-pointer"
        type="submit"
      >
        Realizar Pedido
      </button>
    </form>
  )
}