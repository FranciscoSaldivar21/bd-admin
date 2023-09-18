import { useEffect, useState } from "react";
import { Layout } from "../ui/layout/Layout";
import axios from "axios";
import { apiURL } from "../api/config";
import { userStore } from "../store/userStore";
import { SaleRow } from "../moleculs/SaleRow";

export const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(0);
  const token = userStore((state) => state.token);

  const getSales = async () => {
    try {
      const { data } = await axios.get(`${apiURL}sales/all/${page}`, {
        headers: { "x-token": token },
      });
      setSales(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSales();
  }, [page]);

  return (
    <Layout>
      <div>
        <p className="font-titles text-3xl">TODAS LAS VENTAS </p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Fecha de compra
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Folio de compra
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  $Total
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Ver
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Validar
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                ""
              ) : (
                <tr>
                  <th>
                    <p className="text-center mt-10">
                      No hay mas resgistros por mostrar
                    </p>
                  </th>
                </tr>
              )}
              {sales.map((sale) => {
                return (
                  <SaleRow key={sale.id} sale={sale} />
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center">
            {page > 0 ? (
              <p
                onClick={() => setPage(page > 0 ? page - 1 : 0)}
                className="text-blue-700 py-3 cursor-pointer"
              >
                Anterior
              </p>
            ) : (
              ""
            )}
            {sales.length > 0 ? (
              <p
                onClick={() => setPage(page + 1)}
                className="text-blue-700 py-3 ml-6 cursor-pointer"
              >
                Siguiente
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
