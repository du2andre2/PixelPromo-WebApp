import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import MyPerfil from '@/components/MyPerfil'
import OtherUserPerfil from '@/components/OtherUserPerfil'

export default function Perfil() {
  const { id } = useParams()

  return (
    <>
      <Helmet title="User" />
      <OtherUserPerfil />
    </>
  )
}
