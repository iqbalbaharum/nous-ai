import { useNavigate } from 'react-router-dom'

const PageSearch = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex flex-col justify-center bg-[#212129]">
      <header className="h-1/6 w-full">
        <button onClick={() => {navigate('/')}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h3 className="text-center text-xl font-bold ">What is Nous AI</h3>
      </header>
      <main className=" h-5/6 w-full">
        <section className=" h-1/6">
        <div>Sources</div>
        <button>
          hi
        </button>
        </section>
        <section className=" h-5/6">Chat components</section>
        {/* absolute and floating*/}
      </main>
      <div className="absolute bottom-0 left-0 w-full h-20 ">Ask away components</div>
    </div>
  )
}

export default PageSearch
