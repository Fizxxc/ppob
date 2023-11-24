import React from 'react';
import Header from '../../components/Header';
import UserIcon from '../../assets/Profile-Photo.png';
import {MdOutlineAlternateEmail, MdPersonOutline} from 'react-icons/md';
import {BiSolidPencil} from 'react-icons/bi';
import {BsCheckLg} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import http from '../../helpers/http';
import { logout } from '../../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { getProfileAction } from '../../redux/actions/profile';


function Profile() {
  const profile = useSelector(state => state.profile.data);
  const token = useSelector(state => state.auth.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = React.useState(false);
  const [selectedPIcture, setSelectedPicture] = React.useState(null);
  const [pictureURI, setPictureURI] = React.useState('');

  const doLogout = async () =>{
    dispatch(logout());
    navigate('/login');
  };

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };

  const updateProfile = async (values) => {
    try {
      const form = {
        email: values.email || profile?.email,
        first_name: values.first_name || profile?.first_name,
        last_name: values.last_name || profile?.last_name,
      };
      const formJSON = JSON.stringify(form);
      await http(token).put('/profile/update', formJSON);
      dispatch(getProfileAction(token));
      setEdit(false);
    } catch (error) {
      return error?.response?.data.message;
    }
  };

  const updateProfileImage = async () => {
    try {
      const form = new FormData();
      form.append('profile_image', selectedPIcture);
      await http(token).put('/profile/image', form, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      dispatch(getProfileAction(token));
      setEdit(false);
    } catch (error) {
      return error?.response?.data.message;
    }
  };

  return (
    <div className='w-full lg:pt-20'>
      <Header/>
      <div className='w-full px-[10%] lg:px-[30%] py-10 flex flex-col items-center gap-4'>
        <div className='flex flex-col gap-6 w-full items-center justify-center'>
          <div className='relative'>
            <div className='w-28 h-28 overflow-hidden rounded-full shadow-lg'>
              {selectedPIcture && <img className="w-full h-full object-cover" src={pictureURI} alt="" />}
              {profile?.profile_image.includes('https://minio.nutech-integrasi.app') && <img className="w-full h-full object-cover" src={UserIcon} alt="User"/>}
              {!selectedPIcture && profile?.profile_image === null ? <img src={UserIcon} className='w-full h-full object-cover' alt="" /> : 
                <img src={profile?.profile_image} className='w-full h-full object-cover' alt="" />}
            </div>
            {!selectedPIcture && <label
              className='cursor-pointer absolute 
                right-2 flex items-center justify-center 
                w-8 h-8 bottom-0 text-black rounded-full 
                shadow-lg bg-white p-2 border-none'>
              <input 
                type='file'
                name='profile_image'
                className='hidden'
                onChange={changePicture}/>
              <BiSolidPencil size={10}/>
            </label>}
            {selectedPIcture && <button onClick={updateProfileImage}
              className='cursor-pointer absolute 
                right-2 flex items-center justify-center 
                w-8 h-8 bottom-0 text-black rounded-full 
                shadow-lg bg-white p-2 border-none'>
              <BsCheckLg size={20}/>
            </button>}
          </div>
          <h1 className="text-black font-semibold text-2xl">{profile?.first_name} {profile?.last_name}</h1>
        </div>
        <Formik
          initialValues={{ 
            email: '', 
            first_name: '',
            last_name: '' }}
          onSubmit={updateProfile}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
              <div className="relative form-control w-full flex flex-col gap-1">
                <label className="label">
                  <span className="label-text text-black text-sm font-semibold">Email</span>
                </label>
                <MdOutlineAlternateEmail className='absolute bottom-3 left-4 text-gray-600' size={15} />
                <input 
                  type="email" 
                  name='email'
                  placeholder="masukan email" 
                  className="formAuth"
                  value={!edit ? profile?.email : values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={!edit} />
              </div>
              <div className="relative form-control w-full flex flex-col gap-1">
                <label className="label">
                  <span className="label-text text-black text-sm font-semibold">Nama depan</span>
                </label>
                <MdPersonOutline className='absolute bottom-3 left-4 text-gray-600' size={15} />
                <input 
                  type="text" 
                  name='first_name'
                  placeholder="nama depan" 
                  className="formAuth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={!edit ? profile?.first_name : values.first_name}
                  readOnly={!edit} />
              </div>
              <div className="relative form-control w-full flex flex-col gap-1">
                <label className="label">
                  <span className="label-text text-black text-sm font-semibold">Nama belakang</span>
                </label>
                <MdPersonOutline className='absolute bottom-3 left-4 text-gray-600' size={15} />
                <input 
                  type="text" 
                  name='last_name'
                  placeholder="nama belakang" 
                  className="formAuth" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={!edit ? profile?.last_name : values.last_name}
                  readOnly={!edit}/>
              </div>
              {edit && <button
                className="bg-primary hover:bg-red-700 
                    duration-300 rounded-md shadow-lg 
                    text-white text-sm font-semibold 
                    w-full normal-case h-10">simpan</button>}
            </form>
          )}
        </Formik>
        {!edit && <button onClick={()=> setEdit(!edit)}
          className="bg-white hover:bg-primary 
            border-2 rounded-md border-primary text-sm 
            font-semibold text-primary hover:text-white 
            duration-300 m w-full normal-case h-10">Edit profile</button>}
        {!edit && <button onClick={()=>document.getElementById('my_modal_1').showModal()}
          className="bg-primary hover:bg-red-700 
            duration-300 rounded-md shadow-lg 
            text-white text-sm font-semibold 
            w-full normal-case h-10">Log out</button>}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-white text-black">
            <h3 className="font-bold text-lg">Keluar!</h3>
            <p className="py-4">Apakah anda yakin ingin keluar?</p>
            <div className="modal-action">
              <form method="dialog flex gap-3">
                <button onClick={doLogout} className="btn normal-case mx-2 bg-error border-none">iya</button>
                <button className="btn normal-case mx-2 bg-gray-400 border-none">tidak</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Profile;