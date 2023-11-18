interface ButtonProp {
  className?: string
  name: string
  onClick: (e: any) => void
  icon?: React.ReactNode
  disabled?: boolean
}

const GenericButton = ({ name, onClick, icon, className, disabled }: ButtonProp) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-white border border-gray-100 shadow-inner group ${
        className ?? ''
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-100 border-t-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-100 border-b-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute top-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-100 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute inset-0 w-full h-full duration-100 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
      <span className="relative transition-colors duration-100 delay-200 group-hover:text-white ease">
        <span>{name}</span>
      </span>
    </button>
  )
}

export default GenericButton
