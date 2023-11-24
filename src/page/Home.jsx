import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import http from '../helpers/http';
import React from 'react';
import { getBalanceAction } from '../redux/actions/balance';
import Balance from '../components/Balance';
import { setTransaction } from '../redux/reducers/transaction';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token.token);
  const [services, setServices] = React.useState([]);
  const [banner, setBanner] = React.useState([]);

  const getService = async (token) =>{
    try {
      const {data} = await http(token).get('/services');
      setServices(data.data); 
    } catch (error) {
      const message = error?.response?.data?.message;
      return message;
    }
  };

  const getBanner = async (token) =>{
    try {
      const {data} = await http(token).get('/banner');
      setBanner(data.data); 
    } catch (error) {
      const message = error?.response?.data?.message;
      return message;
    }
  };

  const doTransaction = async (items) =>{
    dispatch(setTransaction(items));
    navigate('/transaction');
  };

  React.useEffect(()=>{
    dispatch(getBalanceAction(token));
    getService(token);
    getBanner(token);
  }, [token]);


  return (
    <div className="h-full lg:h-screen w-full lg:pt-20">
      <Header />
      <div className="px-[10%]">
        <Balance />
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 w-full my-20">
          {services.map(items => (<button key={`services-${items.service_code}`} onClick={()=> doTransaction(items)} className="service flex flex-col items-center gap-1 py-2 text-black">
            <div className="w-14 h-14 overflow-hidden rounded-xl shadow-lg">
              <img src={items.service_icon} alt={items.service_name} className="w-full h-full object-cover" />
            </div>
            <p className="text-[8px] lg:text-sm">{items.service_name}</p>
          </button>))}
        </div>
        <div className="flex flex-col gap-2 py-6 w-full">
          <h1 className="text-black text-md font-semibold">Temukan promo terbaik</h1>
          <div className="flex w-full snap-x snap-mandatory overflow-x-scroll scrollbar-hide gap-4 py-3">
            {banner.map(items => (
              <div className='snap-always snap-center py-5' key={`banner-${items.banner_name}`} >
                <div className="h-[120px] w-[300px] rounded-lg overflow-hidden shadow-xl">
                  <img src={items?.banner_image} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;