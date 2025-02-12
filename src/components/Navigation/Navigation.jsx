import login from '../../assets/svg/profile/log-in.svg';
import logo from '../../assets/svg/profile/logo.svg';
import { Link } from 'react-router';

function Navigation(){
    return (
        <div className="w-[100%] h-[50px] justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2 flex cursor-pointer">
            <img src={logo} alt="Login"/>
            </div>
            <div className="justify-start items-center gap-8 flex">
            <Link to="/" className="text-[#000000] text-base font-semibold font-['Plus Jakarta Sans'] leading-normal cursor-pointer">Drivers</Link>
            <Link to="/Teams" className="text-[#000000] text-base font-semibold font-['Plus Jakarta Sans'] leading-normal cursor-pointer">Teams</Link>
            <Link to="/Race" className="text-[#000000] text-base font-semibold font-['Plus Jakarta Sans'] leading-normal cursor-pointer">Race</Link>
            </div>
            <img src={login} alt="Login" className='cursor-pointer'/>
        </div>
    )
}

export default Navigation;