import { Navigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { setWarningMessage } from '../redux/reducers/auth';

const PrivateRouter = ({children})=>{
  const token = useSelector(state => state.auth.token.token);
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if(!token){
      dispatch(setWarningMessage('Lakukan login terlebih dahulu'));
    }
  },[]);

  if(token){
    return children;
  }else{
    return <Navigate to="/Login"/>;
  }
};

PrivateRouter.propTypes = {
  children: propTypes.element
};

export default PrivateRouter;
