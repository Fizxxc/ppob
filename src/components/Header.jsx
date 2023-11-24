import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import { getProfileAction } from '../redux/actions/profile';
import NavbarModal from './NavbarModal';

function Header() {
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const token = useSelector(state => state.auth.token.token);

  React.useEffect(()=>{
    dispatch(getProfileAction(token));
  }, [token]);

  return (
    <div className="lg:fixed top-0 z-10 bg-white flex w-full h-16 items-center justify-between px-[10%] border-b-[1.5px] border-grey-200">
      <Link to={'/home'} className="curson-pointer flex gap-2 items-center">
        <div className="w-8 h-8 overflow-hidden">
          <img className="w-full h-full object-cover" src={Logo} alt="" />
        </div>
        <label className="text-lg font-semibold text-black" htmlFor="">SIMS PPOB</label>
      </Link>
      <NavbarModal />
      <div className="hidden lg:flex items-center">
        <ul className="flex gap-6 text-black text-sm">
          {currentPath === '/top-up' ? <Link to={'/top-up'} className="navSelect"><li>Top Up</li></Link> : 
            <Link to={'/top-up'} className="nav"><li>Top Up</li></Link>}
          {currentPath === '/transaction' || currentPath === '/transaction/history' ? <Link to={'/transaction/history'} className="navSelect"><li>Transaksi</li></Link> : 
            <Link to={'/transaction/history'} className="nav"><li>Transaksi</li></Link>}
          {currentPath === '/profile' ? <Link to={'/profile'} className="navSelect"><li>Akun</li></Link> : 
            <Link to={'/profile'} className="nav"><li>Akun</li></Link>}
        </ul>
      </div>
    </div>
  );
}

export default Header;