
import "./Navbar.css";
import { ModeToggle } from '@/Components/ModeToggle/ModeToggle'

const Navbar = () => {
  return (
    <div className='newNav--wrapper'>
        <div className="newNav--logo">
            <img src="/logo.svg" alt="logo" />
            <h3>LeeterBoard</h3>
        </div>
    </div>
  )
}

export default Navbar
