import { useNavigate } from "react-router-dom"
import { ActiveGiveaways } from "../components/ActiveGiveaways"
import { NoActiveGiveaways } from "../components/NoActiveGiveaways"
import { Layout } from "../ui/layout/Layout"


export const GiveawaysPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
        <div>
          <button onClick={() => navigate("/newgiveaway")}>Nuevo sorteo</button>
        </div>
        <div>
          <ActiveGiveaways />
        </div>
        <div>
          <NoActiveGiveaways />
        </div>
    </Layout>
  )
}
