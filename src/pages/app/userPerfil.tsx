/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from 'react-helmet-async'
import Cookies from 'js-cookie'

import MyPerfil from '@/components/MyPerfil'
import OtherUserPerfil from '@/components/OtherUserPerfil';
import { useParams } from 'react-router-dom';
import { Auth } from '@/api/login';

export default function Perfil() {
  const authString = Cookies.get('auth'); 
  const auth: Auth | undefined = authString ? JSON.parse(authString) : undefined;

  if (!auth || !auth.token || !auth.userId) {
    window.location.href = '/sign-in';
    return null;  
  }

  const { id } = useParams();

  return (
    <>
      <Helmet title="User" />
      {id === auth.userId ? <MyPerfil auth={auth}/> : <OtherUserPerfil auth={auth}/>}
    </>
  );
}
