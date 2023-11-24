import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { Web3Wrapper } from 'App'
import bg from '/public/img/bg.png'
import AlertBox from 'components/AlertBox'

interface BackgroundImages {
  [key: string]: string
}
const backgroundImages: BackgroundImages = {
  '/mint': '/img/minting.png',
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  const backgroundImage = backgroundImages[location.pathname] || '/img/bg.png'
  const isMintPath = location.pathname === '/mint'

  return (
  <Web3Wrapper>
     <div className='relative '>
      <img
        src={backgroundImage}
        className={`absolute -z-10 w-screen ${
          isMintPath ? 'h-screen object-cover' : 'min-h-screen object-cover'
        }`}
      />

      <div className='z-10'>
        <Header />
        <hr className="h-px mb-8 bg-gray-700 border-0 dark:bg-gray-700" />
        <div className="container mx-auto text-white relative">
          <Outlet />
        </div>
        <AlertBox />
      </div>

      {!isMintPath?
        <>
          <div className=''>
            <div className='absolute top-96 inset-0 bg-gradient-to-b from-transparent via-black via-30% to-[#285BD9] -z-10 translate-y-28'></div>
          </div>
        </>
        :
        <></>
      }
      
    </div>
  </Web3Wrapper> 
  )
}

export default MainLayout
