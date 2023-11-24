import {MdOutlineMoneyOffCsred} from 'react-icons/md';

function EmptyTransaction() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col gap-4 w-[30%] p-20 text-gray-300 items-center justify-center'>
        <MdOutlineMoneyOffCsred size={70} className='drop-shadow-lg' />
        <p className='text-2xl text-center'>Maaf, anda belum melakukan transaksi</p>
      </div>
    </div>
  );
}

export default EmptyTransaction;