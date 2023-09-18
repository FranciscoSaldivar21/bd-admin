import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../ui/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../api/config";
import { BuyTickest } from "../components/BuyTickest";
import { userStore } from "../store/userStore";

export const SalePage = () => {
  const navigate = useNavigate();
  const token = userStore((state) => state.token);
  const { state } = useLocation();
  const { id, email, name, phone } = state;
  const [sale, setSale] = useState({});
  const [tickets, setTickets] = useState([{ticket_price: 0}]);
  const [isLoading, setIsLoading] = useState(true);

  const getSale = async () => {
    try {
      const { data } = await axios.get(`${apiURL}sales/getSaleById/${id}`);
      setSale(data.saleData);
      setTickets(data.ticketsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSale();
    setIsLoading(false);
  }, [isLoading]);

  const validateSale = async (idSale, status) => {
    if (status === 1) return;

    const confirm2 = confirm(
      `Estás seguro que deseas validar la compra ${idSale}?`
    );

    if (confirm2) {
      try {
        const { data } = await axios.post(
          `${apiURL}validatePayment/${idSale}`,
          {
            headers: { "x-token": token },
          }
        );

        if (data) {
          console.log("Succesful");
          alert(`Compra con ID ${idSale} validada exitosamente.`);
          navigate(0);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return;
  };

  const deleteSale = async (saleId, status) => {
    if (status === 1) {
      alert("NO PUEDES ELIMINAR UNA COMPRA YA VALIDADA");
      return;
    }

    const confirm2 = confirm(
      `¿Estás seguro que deseas eliminar la compra ${saleId}?`
    );

    if (confirm2) {
      try {
        const res = await axios.post(
          `${apiURL}validatePayment/cancel/${saleId}`
        );
        console.log(res);
        alert(`Compra con ID ${saleId} eliminada exitosamente.`);
        navigate("/sales");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const invalidateSale = async (saleId, status) => {
    if (status === 0) return;

    const confirm2 = confirm(
      `¿Estás seguro que deseas invalidar la compra ${saleId}?`
    );

    if (confirm2) {
      try {
        const res = await axios.post(
          `${apiURL}validatePayment/invalidate/${saleId}`
        );
        console.log(res);
        alert(`Compra con ID ${saleId} invalidada exitosamente.`);
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <div>
        <button
          className="py-1 px-4 rounded-md bg-blue-400 text-black hover:bg-blue-600 hover:font-bold mr-4"
          onClick={() => navigate("/sales")}
        >
          REGRESAR
        </button>
      </div>
      <div>
        <div className="mt-8">
          <p className="text-xl font-semibold uppercase font-subTitles md:text-3xl mb-6">
            Detalles de la compra
          </p>
          <p>
            <span className="font-bold md:text-lg">Folio de compra: </span>
            {sale.id}
          </p>
          <p>
            <span className="font-bold md:text-lg">Correo del cliente: </span>
            {email}
          </p>
          <p>
            <span className="font-bold md:text-lg">Nombre del cliente: </span>
            {name}
          </p>
          <p>
            <span className="font-bold md:text-lg">Teléfono del cliente: </span>
            {phone}
          </p>
          <p>
            <span className="font-bold md:text-lg">Fecha de compra: </span>
            {sale.sale_date}
          </p>
          <p>
            <span className="font-bold md:text-lg">Total de compra: </span>$
            {parseInt(tickets[0].ticket_price) * parseInt(tickets.length)}
          </p>
          <p className="font-bold md:text-lg">
            Estado:{" "}
            {sale.saleStatus === 1 ? (
              <span className="text-green-500">Pagada</span>
            ) : (
              <span className="text-red-500">Pendiente de pago</span>
            )}
          </p>
        </div>
        <div className="mt-2">
          {sale.saleStatus === 0 ? (
            <button
              className="py-1 px-4 rounded-md bg-green-400 text-black hover:bg-green-600 hover:font-bold mr-4"
              onClick={() => validateSale(sale.id, sale.saleStatus)}
            >
              VALIDAR
            </button>
          ) : (
            <button
              className="py-1 px-4 rounded-md bg-red-500 text-black hover:bg-red-700 hover:font-bold mr-4"
              onClick={() => invalidateSale(sale.id, sale.saleStatus)}
              disabled={sale.status === 0 ? true : false}
            >
              INVALIDAR
            </button>
          )}
          <button
            className="py-1 px-4 rounded-md bg-red-500 text-black hover:bg-red-700 hover:font-bold mr-4"
            onClick={() => deleteSale(sale.id, sale.saleStatus)}
          >
            ELIMINAR
          </button>
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold uppercase font-subTitles md:text-3xl mb-2">
            Sorteo{" "}
          </p>
          <p className="md:text-lg">
            <span className="font-bold md:text-lg">Auto: </span>
            {sale.car}
          </p>
          <p className="md:text-lg">
            <span className="font-bold md:text-lg">Descripción del auto: </span>
            {sale.description}
          </p>
          <p className="md:text-lg">
            <span className="font-bold md:text-lg">
              Fecha de registro del sorteo:{" "}
            </span>
            {sale.creation_date}
          </p>
          <p className="md:text-lg">
            <span className="font-bold md:text-lg">Fecha del sorteo: </span>
            {sale.giveaway_date}
          </p>
          {sale.status === 1 ? (
            <p className="text-green-600 font-bold md:text-lg">
              <span className="text-black font-bold md:text-lg">
                Estatus del sorteo:{" "}
              </span>
              Activo
            </p>
          ) : (
            <p className="text-red-600 font-bold md:text-lg">
              <span className="text-black font-bold md:text-lg">
                Estatus del sorteo:{" "}
              </span>
              Inactivo
            </p>
          )}
        </div>
        <div className="uppercase font-extrabold md:text-lg">
          {sale.benefic === 1 ? (
            <p>Tiene beneficio GOLD DIAMOND por comprar en la primer semana</p>
          ) : sale.benefic === 2 ? (
            <p>
              Tiene beneficio SILVER DIAMOND por comprar en la segunda semana
            </p>
          ) : sale.benefic === 3 ? (
            <p>
              Tiene beneficio BRONZE DIAMOND por comprar en la tercer semana
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <BuyTickest data={tickets} benefic={sale.benefic} />
    </Layout>
  );
};
