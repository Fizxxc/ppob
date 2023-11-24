// import React from 'react';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png';
import {MdOutlineAlternateEmail, 
  MdLockOutline,
  MdError} from 'react-icons/md';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../redux/reducers/auth';
import { asyncLoginAction } from '../../redux/actions/auth';
// import { logout as logoutAction } from '../../redux/reducers/auth';

const validationSchema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Masukan email'),
  password: Yup.string().required('Masukan password'),
});

function Login() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const successMessage = useSelector(state => state.auth.successMessage);
  const [open, setOpen] = React.useState(false);

  const doLogin = async (values) =>{
    dispatch(clearMessage());
    dispatch(asyncLoginAction(values));
  };

  React.useEffect(() => {
    if (successMessage && token) {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      dispatch(clearMessage());
    }
  }, [successMessage, navigate, dispatch]);
  
  return (
    <div className="w-full h-screen flex bg-white">
      <Formik
        initialValues={{ 
          email: '',
          password: '',
        }}
        validationSchema = {validationSchema}
        onSubmit={doLogin}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          // isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col w-full px-[5%] py-16 gap-10 items-center justify-center">
            <div className="flex gap-2 w-full justify-center items-center">
              <div className="w-8 h-8 overflow-hidden">
                <img className="w-full h-full object-cover" src={Logo} alt="" />
              </div>
              <label className="text-lg font-semibold text-black" htmlFor="">SIMS PPOB</label>
            </div>
            <h1 className="font-semibold text-sm md:text-xl text-black w-full text-center px-[30%]">Masuk atau buat akun untuk memulai</h1>
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
            <div className="flex flex-col gap-3 w-full px-[10%]">
              <div className="relative flex flex-col gap-0 form-control w-full">
                <MdOutlineAlternateEmail className={`absolute top-3 left-4 ${errors.email && touched.email && 'text-error'}`} size={15} />
                <MdOutlineAlternateEmail className="absolute top-3 left-4" size={15} />
                <input 
                  type="email" 
                  placeholder="Masukan email anda" 
                  className={`formAuth ${errors.email && touched.email && 'input-error'}`}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} />
                {errors.email && touched.email && (
                  <label className="label flex gap-1 items-center text-error justify-start">
                    <MdError size={10} />
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>)
                }
              </div>
              <div className="relative flex flex-col gap-0 form-control w-full">
                <MdLockOutline className={`absolute top-3 left-4  ${errors.password && touched.password && 'text-error'}`} size={15} />
                {!open && <button onClick={() => setOpen(!open)} className="absolute top-3 right-4"><FiEye size={15} /></button>}
                {open && <button onClick={() => setOpen(!open)} className="absolute top-3 right-4"><FiEyeOff size={15} /></button>}
                <input 
                  type={!open ? 'password' : 'text'} 
                  placeholder="password" 
                  className={`formAuth ${errors.password && touched.password && 'input-error'}`}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password} />
                {errors.password && touched.password && (
                  <label className="label flex gap-1 items-center text-error justify-start">
                    <MdError size={10} />
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>)
                }
              </div>
              <button 
                className="btn btn-primary w-full h-10 normal-case rounded-md mt-4 text-white"
              >
                  Login
              </button>
            </div>
            <p className="text-black">Belum punya akun? Registrasi <Link to={'/'} className="text-primary font-semibold">disini</Link> </p>
          </form>
        )}
      </Formik>
      <div className="hidden md:block bg-[url('/src/assets/Illustrasi-Login.png')] bg-contain bg-no-repeat bg-red-50 bg-center flex-1 flex-col"></div>
    </div>
  );
}

export default Login;