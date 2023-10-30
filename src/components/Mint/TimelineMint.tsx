import { useState } from 'react'

const TimelineMint = () => {
  const [timelines] = useState([
    {
      date: '7/11/2023',
      time: '12:59 PM UTC',
      isDate: true,
      title: 'Community Bot Mint',
    },
    {
      date: '7/11/2023',
      time: '12:59 PM UTC',
      isDate: false,
      title: 'Community Bot Mint',
    },
    {
      date: '7/11/2023',
      time: '12:59 PM UTC',
      isDate: false,
      title: 'Community Bot Mint',
    },
  ])

  return (
    <div className=" rounded-lg relative">
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <div className="text-lg font-bold mb-4">Schedule</div>
        {timelines.map((timeline, index) => (
          <div className=" max-w-4xl flex" key={index}>
            <div className="w-1 relative bg-white">
              {timeline.isDate ? (
                <div className="absolute top-0 left-1/2 w-5 h-5 bg-white rounded-full  -translate-x-1/2 grid place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-orange-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="absolute top-0 left-1/2 w-5 h-5 bg-white rounded-full  -translate-x-1/2 grid place-content-center">
                  <div className="w-3 h-3 bg-orange-300 rounded-full  grid place-content-center"></div>
                </div>
              )}
              {index === timelines.length - 1 && (
                <div className="absolute bottom-0 left-1/2 w-5 h-5 bg-white rounded-full  -translate-x-1/2 grid place-content-center"></div>
              )}
            </div>
            <div className="mt-0 m-4 relative">
              <div className="text-left border border-gray-300 shadow-lg rounded-md bg-white flex items-center justify-between gap-3 p-4">
                <div className="w-3 h-3 bg-white absolute left-1 top-3 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <h3 className="font-semibold text-base text-black">{timeline.title}</h3>
                <p className="text-sm text-black whitespace-nowrap">
                  {timeline.time} {timeline.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimelineMint
