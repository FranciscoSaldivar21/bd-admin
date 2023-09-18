import { ClientRow } from "../moleculs/ClientRow";


export const ClientsTable = ({ data }: props) => {
    return (    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-white uppercase bg-gray-800">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Correo
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Teléfono
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Fecha de registro
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        <span>Más</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((element, i) => {
                        return <ClientRow key={i} data={element} />;
                    })
                }
            </tbody>
        </table>
    </div>

    )
}
