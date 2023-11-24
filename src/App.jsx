import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {persistor, store} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './page/auth/Registration';
import Login from './page/auth/Login';
import Home from './page/Home';
import Profile from './page/Profile';
import Topup from './page/Topup';
import Transaction from './page/Transaction/index.jsx';
import PrivateRouter from './components/PrivateRouter';
import History from './page/Transaction/History';

function App(){
  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/profile" element={<PrivateRouter><Profile/></PrivateRouter>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<PrivateRouter><Home/></PrivateRouter>}/>
            <Route path="/top-up" element={<PrivateRouter><Topup/></PrivateRouter>}/>
            <Route path="/transaction" element={<PrivateRouter><Transaction/></PrivateRouter>}/>
            <Route path="/transaction/history" element={<PrivateRouter><History/></PrivateRouter>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;