// import React from 'react';
import { Formik } from 'formik';
import Logo from '../../assets/Logo.png';
import {MdOutlineAlternateEmail, 
  MdPersonOutline, 
  MdLockOutline,
  MdError} from 'react-icons/md';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../redux/reducers/auth';
import { asyncRegisterAction } from '../../redux/actions/auth';

const validationSchema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Masukan email'),
  first_name: Yup.string().required('Masukan nama depan'),
  last_name: Yup.string().required('Masukan nama belakang'),
  password: Yup.string()
    .required('Masukan password')
    .min(8, 'Password minimal 8 karakter')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      'Password harus mengandung simbol dan satu angka'
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Pastikan sama dengan password')
    .required('Masukan konfirmasi password'),
});

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const successMessage = useSelector(state => state.auth.successMessage);
  const [open, setOpen] = React.useState(false);
  const [openEye, setOpenEye] = React.useState(false);

  const doRegistration = async (values) =>{
    dispatch(clearMessage());
    dispatch(asyncRegisterAction(values));
  };

  React.useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      dispatch(clearMessage());
    }
  }, [successMessage, navigate, dispatch]);

  React.useEffect(()=>{
    if(token){
      navigate('/home');
    }
  });
  
  return (
    <div className="w-full h-full flex bg-white">
      <Formik
        initialValues={{ 
          email: '',
          first_name: '',
          last_name: '', 
          password: '',
          confirm_password: '',
        }}
        validationSchema = {validationSchema}
        onSubmit={doRegistration}
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
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col w-full px-[5%] py-16 gap-6 items-center">
            <div className="flex gap-2 w-full justify-center items-center">
              <div className="w-8 h-8 overflow-hidden">
                <img className="w-full h-full object-cover" src={Logo} alt="" />
              </div>
              <label className="text-lg font-semibold text-black" htmlFor="">SIMS PPOB</label>
            </div>
            <h1 className="font-semibold text-sm md:text-xl text-black w-full text-center px-[30%]">Lengkapi data untuk membuat akun</h1>
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
                <MdPersonOutline className={`absolute top-3 left-4  ${errors.first_name && touched.first_name && 'text-error'}`} size={15} />
                <input 
                  type="text" 
                  placeholder="nama depan" 
                  className={`formAuth ${errors.first_name && touched.first_name && 'input-error'}`}
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name} />
                {errors.first_name && touched.first_name && (
                  <label className="label flex gap-1 items-center text-error justify-start">
                    <MdError size={10} />
                    <span className="label-text-alt text-error">{errors.first_name}</span>
                  </label>)
                }
              </div>
              <div className="relative flex flex-col gap-0 form-control w-full">
                <MdPersonOutline className={`absolute top-3 left-4 ${errors.last_name && touched.last_name && 'text-error'}`} size={15} />
                <input 
                  type="text" 
                  placeholder="nama belakang" 
                  className={`formAuth ${errors.last_name && touched.last_name && 'input-error'}`}
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name} />
                {errors.last_name && touched.last_name && (
                  <label className="label flex gap-1 items-center text-error justify-start">
                    <MdError size={10} />
                    <span className="label-text-alt text-error">{errors.last_name}</span>
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
              <div className="relative flex flex-col gap-0 form-control w-full">
                <MdLockOutline className={`absolute top-3 left-4 ${errors.confirm_password && touched.confirm_password && 'text-error'}`} size={15} />
                {!openEye && <button onClick={() => setOpenEye(!openEye)} className="absolute top-3 right-4"><FiEye size={15} /></button>}
                {openEye && <button onClick={() => setOpenEye(!openEye)} className="absolute top-3 right-4"><FiEyeOff size={15} /></button>}
                <input 
                  type={!openEye ? 'password' : 'text'} 
                  placeholder="konfirmasi password" 
                  className={`formAuth ${errors.confirm_password && touched.confirm_password && 'input-error'}`}
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password} />
                {errors.confirm_password && touched.confirm_password && (
                  <label className="label flex gap-1 items-center text-error justify-start">
                    <MdError size={10} />
                    <span className="label-text-alt text-error">{errors.confirm_password}</span>
                  </label>)
                }
              </div>
              <button 
                className="btn btn-primary w-full h-10 normal-case rounded-md mt-4 text-white"
              >
                  Registrasi
              </button>
            </div>
            <p className="text-black">Sudah punya akun? login <Link to={'/login'} className="text-primary font-semibold">disini</Link> </p>
          </form>
        )}
      </Formik>
      <div className="hidden md:block bg-[url('/src/assets/Illustrasi-Login.png')] bg-contain bg-no-repeat bg-red-50 bg-center flex-1 flex-col"></div>
    </div>
  );
}

export default Registration;