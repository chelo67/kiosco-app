


export default function SubmitOrderForm() {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('name')?.toString() ?? ''

        console.log(name)
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