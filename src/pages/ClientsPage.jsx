import { useEffect, useState } from "react"
import { Layout } from "../ui/layout/Layout"
import axios from "axios";
import { userStore } from "../store/userStore";
import { ClientsTable } from "../components/ClientsTable";
import { apiURL } from "../api/config";


export const ClientsPage = () => {
  const token = userStore((state) => state.token);
  const [users, setUsers] = useState([{}]);
  const [page, setPage] = useState(0);

  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${apiURL}users/${page}`, { headers: { 'x-token' : token } });
      setUsers(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getUsers();
  }, [page]);
  
  return (
    <Layout>
      <div>
        <p className="font-titles text-3xl uppercase">Nuestros clientes</p>
        {
          users.length > 0 ?
            <ClientsTable data={users} />
          : <p className="text-center mt-10">No hay mas registros por mostrar</p>
        }
        <div className="flex justify-center">
          {
            page > 0 ?
              <p onClick={() => setPage(page > 0 ? page - 1 : 0)} className="text-blue-700 py-3 cursor-pointer">Anterior</p>
              : ""
          }
          {
            users.length > 0 ?
            <p onClick={() => setPage(page + 1)} className="text-blue-700 py-3 ml-6 cursor-pointer">Siguiente</p>
            : ""
          }
        </div>
      </div>
    </Layout>
  );
}
