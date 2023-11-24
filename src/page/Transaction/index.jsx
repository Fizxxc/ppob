import React from 'react';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import { MdOutlineMoney } from 'react-icons/md';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../helpers/http';
import {MdError} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getBalanceAction } from '../../redux/actions/balance';

function Transaction() {
  const transaction = useSelector(state => state.transaction.data);
  const token = useSelector(state => state.auth.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(()=>{
    if(!transaction){
      navigate('/home');
    }
  });

  const doTransaction = async (e) =>{
    e.preventDefault();
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const form = {
        service_code: transaction?.service_code
      };
      const formJson = JSON.stringify(form);
      const {data} = await http(token).post('/transaction', formJson);
      if(data.status === 0){
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate('/transaction/history');
        }, 3000);
        dispatch(getBalanceAction(token));
      }else{
        setErrorMessage(data.message);
      }
      
    } catch (error) {
      const message = error?.response?.data?.message;
      setErrorMessage(message);
    }
  };
  return (
    <div className='h-full lg:h-screen w-full lg:pt-20'>
      <Header/>
      <div className="px-[10%] w-full">
        <Balance />
        <div className="w-full flex flex-col items-center lg:items-start">
          <h2 className="text-gray-500 text-lg">PemBayaran,</h2>
          <div className='flex gap-3 items-center'>
            <div className='w-16 h-16 overflow-hidden rounded-md shadow-lg'>
              <img className='w-full h-full object-cover ' src={transaction?.service_icon} alt={transaction?.service_name} />
            </div>
            <h1 className="text-black font-semibold text-2xl">{transaction?.service_name}</h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full my-16">
          <form className="flex flex-col gap-4 w-3/4">
            {errorMessage && (
              <div className="flex flex-col gap-2 w-full justify-center items-center">
                <MdError size={40} className="text-error" />
                <p className="text-error font-semibold">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <div className="flex flex-col gap-2 w-full justify-center items-center">
                <BsFillCheckCircleFill size={40} className="text-success" />
                <p className="text-success font-semibold">{successMessage}</p>
              </div>
            )}
            <div className="relative form-control w-full flex flex-col gap-1">
              <MdOutlineMoney className="absolute bottom-3 left-4 text-gray-600" size={15} />
              <input
                type="number"
                name="service_code"
                placeholder="masukan nominal Top Up"
                className="formAuth"
                value={transaction?.service_tariff}
                readOnly
              />
            </div>
            <button onClick={doTransaction}
              className='bg-primary hover:bg-red-700
              duration-300 rounded-md shadow-lg text-white text-sm font-semibold w-full normal-case h-10'
              type='submit'
            >
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Transaction;