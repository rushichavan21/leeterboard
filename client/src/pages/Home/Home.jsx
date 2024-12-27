
import './Home.css'
import NewNav from '@/Components/Navbar/Navbar'
import NewSlider from '@/NewComp/NewSlider'
import Board from '@/Components/Board/Board'
import { useRecoilValue } from 'recoil'
import { loadingAtom } from '@/Atoms/Atoms'
import { Toaster } from "@/Components/ui/toaster"
import '../../Styles/Loader.css'

const Between=()=>{
    return (
      <div className="between container">
    <img src="./trophy.svg" alt="image" />
    <h1>Leeter Board</h1>
    <img src="./trophy.svg" alt="image" />
        </div>
    )
}    

const Loader=()=>{
  return(
    
    <div className="loaderDiv">
    <div className="loader"></div>
    <h3>Loading...</h3>
    </div>

  )
}

const Home = () => {
  const isLoading=useRecoilValue(loadingAtom);
  return (
    <div className='newhome--wrapper'>
    <NewNav/>
    <div className="sidebar--div"> 
    <NewSlider/>
    </div>
    <Between/>
    <Board/>
    {isLoading?<Loader/>:null}
    <Toaster/>
    </div>
  )
}

export default Home
