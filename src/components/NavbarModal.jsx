import { Link } from 'react-router-dom';
import {MdMenu} from 'react-icons/md';

function NavbarModal() {
  const currentPath = window.location.pathname;
  return (
    <div className="dropdown dropdown-end block lg:hidden py-3 z-20">
      <label tabIndex={0} className="btn btn-neutral m-1 bg-transparent border-transparent"><MdMenu size={30} className='text-black'/></label>
      <ul tabIndex={0} className="bg-white dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-4">
        {currentPath === '/top-up' ? <Link to={'/top-up'} className="navSelect"><li>Top Up</li></Link> : 
          <Link to={'/top-up'} className="nav"><li>Top Up</li></Link>}
        {currentPath === '/transaction' || currentPath === '/transaction/history' ? <Link to={'/transaction/history'} className="navSelect"><li>Transaksi</li></Link> : 
          <Link to={'/transaction/history'} className="nav"><li>Transaksi</li></Link>}
        {currentPath === '/profile' ? <Link to={'/profile'} className="navSelect"><li>Akun</li></Link> : 
          <Link to={'/profile'} className="nav"><li>Akun</li></Link>}
      </ul>
    </div>
  );
}

export default NavbarModal;