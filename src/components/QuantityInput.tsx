interface Prop {
  input: number
  setInput: (input: number) => void
}

const QuantityInput = ({ input, setInput }: Prop) => {
  const onHandleInputPlus = (e: any) => {
    const quantity = input + 1
    setInput(quantity)
  }

  const onHandleInputMinus = (e: any) => {
    let quantity = input - 1

    if (quantity < 0) {
      quantity = 0
    }
    setInput(quantity)
  }

  const onHandleInputChanged = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <div className="flex items-center border border-gray-200">
      <button
        type="button"
        className="w-8 h-10 leading-10 text-white transition hover:bg-yellow-300/80"
        onClick={onHandleInputMinus}
      >
        &minus;
      </button>

      <input
        type="number"
        id="Subscribed"
        value={input}
        onChange={onHandleInputChanged}
        className="h-10 w-16 border-transparent text-center text-black [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        className="w-8 h-10 leading-10 text-white transition hover:bg-yellow-300/80"
        onClick={onHandleInputPlus}
      >
        +
      </button>
    </div>
  )
}

export default QuantityInput
