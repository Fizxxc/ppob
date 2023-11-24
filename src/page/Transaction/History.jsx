import React from 'react';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import http from '../../helpers/http';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getBalanceAction } from '../../redux/actions/balance';
import EmptyTransaction from '../../components/EmptyTransaction';

function History() {
  const [history, setHistory] = React.useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token.token);
  const [limit, setLimit] = React.useState(5);
  const [offset, setOffset] = React.useState(0);

  const getTransactionHistory = async (limit, offset) =>{
    try {
      const {data} = await http(token).get('/transaction/history', {params: {
        limit: limit,
        offset: offset
      }});
      setHistory(data.data.records);
    } catch (error) {
      return error?.responset?.data?.massage;
    }
  }; 

  React.useEffect(()=>{
    getTransactionHistory(limit, offset);
    dispatch(getBalanceAction(token));
  }, [token, limit, offset]);

  return (
    <div className='h-full w-full lg:py-20'>
      <Header/>
      <div className="px-[10%] w-full">
        <Balance />
        <div className="w-full flex flex-col items-center lg:items-start gap-3">
          <h2 className="text-black text-2xl font-semibold">Semua Transaksi</h2>
          <div className='flex flex-col gap-5 w-full h-full'>
            {history.length > 0 && <>
              {history.map(items =>(
                <div key={`history-${items.invoice_number}`} className='flex justify-between px-[5%] border-gray-300 border-2 rounded-md py-4'>
                  <div className='flex flex-col justify-between'>
                    {items.transaction_type === 'TOPUP' && <p className='text-2xl text-success font-semibold'>+Rp{items.total_amount}</p>}
                    {items.transaction_type === 'PAYMENT' && <p className='text-2xl text-error font-semibold'>-Rp{items.total_amount}</p>}
                    <p className='text-sm text-gray-500'>{moment(items.created_on).format('MMMM Do YYYY, h:mm')}</p>
                  </div>
                  <p className='text-sm text-gray-500 text-center'>{items.description}</p>
                </div>
              ))}
            </>}
            {history.length < 1 && <EmptyTransaction />}
          </div>
          {history.length === 5  && <>
            {limit !== 10 && <button onClick={()=> setLimit(10)}
              className='bg-white
              duration-300 rounded-md text-primary hover:text-red-700 text-lg font-semibold w-full normal-case h-10'
              type='submit'
            >See All</button>}
          </>}
          {limit > 5 && <div className='flex gap-5 justify-center items-center py-10 w-full'>
            {offset === 0 ? <button className="btn btn-neutral normal-case">Back</button> :
              <button onClick={()=> setOffset(offset-1)} className="btn btn-primary normal-case">Back</button>}
            <p className='text-primary font-semibold'>Page: {offset + 1}</p>
            <button onClick={()=> setOffset(offset + 1)} className="btn btn-primary normal-case">Next</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default History;