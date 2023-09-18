import { useNavigate } from "react-router-dom";

export const SaleRow = ({ sale }: props) => {
    const navigate = useNavigate();
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
                navigate(0);
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

    const goToSaleDetail = (saleId, email, name, phone) => {
        console.log("Redirecting", saleId);
        navigate("/sale", {
            state: {
                id: saleId,
                email: email,
                name: name,
                phone: phone,
            },
        });
    };
    return (
        <tr key={sale.id} className="border-b bg-white">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
            >
                {sale.user_name}
            </th>
            <td className="px-6 py-4 text-black text-center">
                {sale.user_email}
            </td>
            <td className="px-6 py-4 text-black text-center">
                {sale.sale_date}
            </td>
            <td className="px-6 py-4 text-black text-center">
                {sale.id}
            </td>
            <td className="px-6 py-4 text-black text-center">
                {parseInt(sale.ticket_price) *
                    parseInt(sale.totalTickets)}
            </td>
            <td className="px-6 py-4 text-black text-center">
                <button
                    className="py-1 px-4 rounded-md bg-blue-400 text-black hover:bg-blue-600 hover:font-bold"
                    onClick={() =>
                        goToSaleDetail(
                            sale.id,
                            sale.user_email,
                            sale.user_name,
                            sale.user_phone
                        )
                    }
                >
                    VER
                </button>
            </td>
            <td className="px-6 py-4 text-black text-center">
                {sale.status === 0 ? (
                    //Si el status de la compra está en pendiente muestra botón de validar
                    <button
                        className="py-1 px-4 rounded-md bg-green-400 text-black hover:bg-green-600 hover:font-bold"
                        onClick={() => validateSale(sale.id, sale.status)}
                        disabled={sale.status === 1 ? true : false}
                    >
                        VALIDAR
                    </button>
                ) : (
                    //Si no muestra el botón de eliminar
                    <button
                        className="py-1 px-4 rounded-md bg-red-500 text-black hover:bg-red-700 hover:font-bold"
                        onClick={() => invalidateSale(sale.id, sale.status)}
                        disabled={sale.status === 0 ? true : false}
                    >
                        INVALIDAR
                    </button>
                )}
            </td>
            <td className="px-6 py-4 text-black text-center">
                <button
                    className="py-1 px-4 rounded-md bg-red-500 text-black hover:bg-red-700 hover:font-bold"
                    onClick={() => deleteSale(sale.id, sale.status)}
                >
                    ELIMINAR
                </button>
            </td>
        </tr>
    )
}
