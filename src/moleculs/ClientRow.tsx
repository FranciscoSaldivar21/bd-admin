import { useNavigate } from "react-router-dom"


type Props = {
}

export const ClientRow = ({data}: Props) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b bg-white">
      <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
            { data.user_name }
      </th>
      <td className="px-6 py-4 text-black text-center">
          { data.user_email }
      </td>
      <td className="px-6 py-4 text-black text-center">
          { data.user_phone }
      </td>
      <td className="px-6 py-4 text-black text-center">
          { data.register_date }
      </td>
      <td className="px-6 py-4 text-black text-center">
        <button className="py-1 px-4 rounded-md bg-blue-400 text-black hover:bg-blue-600 hover:font-bold" onClick={() => navigate(`/client/${data.user_id}`)}>Ver más</button>
      </td>
    </tr>
  )
}