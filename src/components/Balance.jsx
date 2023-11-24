import { useSelector } from 'react-redux';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import UserIcon from '../assets/Profile-Photo.png';
import React from 'react';

function Balance() {
  const profile = useSelector(state => state.profile.data);
  const balance = useSelector(state => state.balance.data);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-3 lg:gap-0 my-10 w-full items-center">
      <div className="w-full lg:w-[600px] flex flex-col gap-4 items-center lg:items-start">
        <div className="w-20 h-20 overflow-hidden shadow-lg rounded-full">
          {profile?.profile_image?.includes('https://minio.nutech-integrasi.app') ? <img className="w-full h-full object-cover" src={UserIcon} alt="User" /> : 
            <img className="w-full h-full object-cover" src={profile?.profile_image} alt="" />}
        </div>
        <div className='flex flex-col items-center lg:items-start'>
          <h2 className="text-gray-500 text-lg">Selamat datang,</h2>
          <h1 className="text-black font-semibold text-2xl">{profile?.first_name} {profile?.last_name}</h1>
        </div>
      </div>
      <div className="w-full lg:w-[800px] flex flex-col gap-2 rounded-2xl bg-[url('/src/assets/Background-Saldo.png')] bg-cover bg-no-repeat p-6">
        <p className="text-sm text-white">Saldo anda</p>
        <div className='flex gap-1'>
          <p className="text-4xl text-white font-semibold">Rp</p>
          <input 
            type={open ? 'text' : 'password'}
            className="text-4xl text-white font-semibold bg-transparent w-full"
            value={balance?.balance || 0}
            readOnly/>
        </div>
        <div className="text-sm text-white flex gap-3 items-center">Lihat saldo 
          {!open && <button onClick={()=>setOpen(!open)} className='text-center'><FiEye size={15} /></button>}
          {open && <button onClick={()=>setOpen(!open)} className='text-center'><FiEyeOff size={15} /></button>}
        </div>
      </div>
    </div>
  );
}

export default Balance;