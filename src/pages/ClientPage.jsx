import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../store/userStore";
import { Layout } from "../ui/layout/Layout";
import { apiURL } from "../api/config";
import { ClientAdress } from "../moleculs/ClientAdress";


export const ClientPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [show, setShow] = useState(false);
  const token = userStore((state) => (state.token));

  const getClient = async () => {
    const {data} = await axios.get(`${apiURL}users/user/${id}`, { headers: { 'x-token': token } })
    setClient(data);
  }

  useEffect(() => {
    getClient();
  }, [])
  
  return (
    <Layout>
      <div className="mt-6">
        <p><span className="font-bold">Email: </span>{ client.user_email }</p>
        <p><span className="font-bold">Registro de usuario: </span>{ client.register_date }</p>
        {
          show ? 
          <div>
            <p><span className="font-bold">Nombre: </span>{ client.user_name }</p>
            <p><span className="font-bold">Telefono: </span>{ client.user_phone }</p>
            <ClientAdress adress={client.adress}/>
            <button onClick={() => setShow(false)} className="mt-4 py-1 px-3 bg-darkGold hover:font-bold rounded-lg">Ocultar</button>
          </div>
          :
          <button onClick={() => setShow(true)} className="mt-4 py-1 px-3 bg-darkGold hover:font-bold rounded-lg">Ver más</button>
        }
      </div>
    </Layout>
  )
}
