import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Web3Wrapper } from 'App'
import bg from '/public/img/bg.svg'
import AlertBox from 'components/AlertBox'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3Wrapper>
      <img src={bg} className="absolute object-cover w-screen -z-10" />
      <Header />
      <hr className="h-px mb-8 bg-gray-700 border-0 dark:bg-gray-700" />
      <div className="container mx-auto text-white">
        <Outlet />
      </div>
      <AlertBox />
    </Web3Wrapper>
  )
}

export default MainLayout
