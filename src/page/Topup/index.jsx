import React from 'react';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import { MdOutlineMoney, MdError } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../helpers/http';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getBalanceAction } from '../../redux/actions/balance';

function Topup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topUp, setTopUp] = React.useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const token = useSelector((state) => state.auth.token.token);
  const nominal = [
    {
      id: 1,
      nominal: 10000,
    },
    {
      id: 2,
      nominal: 20000,
    },
    {
      id: 3,
      nominal: 50000,
    },
    {
      id: 4,
      nominal: 100000,
    },
    {
      id: 5,
      nominal: 250000,
    },
    {
      id: 6,
      nominal: 500000,
    },
  ];

  React.useEffect(() => {
    setIsButtonDisabled(topUp < 10000 || topUp > 1000000);
  }, [topUp]);

  const doTopUp = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const form = {
        top_up_amount: topUp,
      };
      const formJson = JSON.stringify(form);
      const { data } = await http(token).post('/topup', formJson);
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

  const handleNominal = (amount) => {
    setTopUp(amount);
  };

  return (
    <div className="h-full lg:h-screen w-full lg:pt-20">
      <Header />
      <div className="px-[10%] w-full">
        <Balance />
        <div className="w-full flex flex-col items-center lg:items-start">
          <h2 className="text-gray-500 text-lg">Silahkan masukkan,</h2>
          <h1 className="text-black font-semibold text-2xl">Nominal Top Up</h1>
        </div>
        <div className="flex flex-col gap-4 w-full my-16">
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
          <div className='flex flex-col lg:flex-row w-full gap-2'>
            <form className="flex flex-col gap-4 w-full lg:w-3/4">
              <div className="relative form-control w-full flex flex-col gap-1">
                <MdOutlineMoney className="absolute bottom-3 left-4 text-gray-600" size={15} />
                <input
                  type="number"
                  name="top_up_amount"
                  placeholder="masukan nominal Top Up"
                  className="formAuth"
                  onChange={(e) => setTopUp(e.target.value)}
                  value={topUp || ''}
                />
              </div>
              <button
                className={`${
                  isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-red-700'
                } duration-300 rounded-md shadow-lg text-white text-sm font-semibold w-full normal-case h-10`}
                onClick={doTopUp}
                disabled={isButtonDisabled}
                type='submit'
              >
              Top Up
              </button>
            </form>
            <div className="grid grid-cols-3 gap-2">
              {nominal.map((items) => (
                <button
                  key={`nominal-${items.id}`}
                  className={`${
                    topUp === items.nominal ? 'bg-primary text-white' : 'bg-white border-gray-300'
                  } border-2 px-2 rounded-md shadow-lg text-black text-sm w-full h-11`}
                  onClick={() => handleNominal(items.nominal)}
                >
                Rp{items.nominal}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topup;
