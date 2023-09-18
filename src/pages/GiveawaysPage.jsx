import { useNavigate } from "react-router-dom"
import { ActiveGiveaways } from "../components/ActiveGiveaways"
import { NoActiveGiveaways } from "../components/NoActiveGiveaways"
import { Layout } from "../ui/layout/Layout"


export const GiveawaysPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
        <div className="mx-auto mb-4">
          <button className="bg-blue-500 px-3 py-2 rounded-md font-normal text-white hover:bg-blue-600" onClick={() => navigate("/newgiveaway")}>Nuevo sorteo</button>
        </div>
        <ActiveGiveaways />
        <NoActiveGiveaways />
    </Layout>
  )
}
