import { GiveawayForm } from "../components/GiveawayForm"
import { Layout } from "../ui/layout/Layout"


export const NewGiveawayPage = () => {
  return (
    <Layout>
        <div className="flex-col w-5/6 mx-auto">
            <p className="font-titles text-4xl">Nuevo sorteo</p>
            <GiveawayForm />
        </div>
    </Layout>
  )
}
