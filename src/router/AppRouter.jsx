import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, GiveawaysPage, ClientsPage, GiveawayPage, NewGiveawayPage, ClientPage, TicketPage, SalesPage, SalePage } from "../pages";
import { userStore } from "../store/userStore";

const AppRouter = () => {
    const id = userStore((state) => state.id);
  return (
    <Routes>
      <Route path="/" element={ id ? <HomePage /> : <LoginPage /> } />
      <Route path="/*" element={ id ? <HomePage /> : <LoginPage />} />
      <Route path="/auth" element={ id ? <HomePage /> : <LoginPage />} />
      <Route path="/giveaways" element={ id ? <GiveawaysPage /> : <LoginPage />} />
      <Route path="/newgiveaway" element={ id ? <NewGiveawayPage /> : <LoginPage />} />
      <Route path="/giveaway/:id" element={ id ? <GiveawayPage /> : <LoginPage />} />
      <Route path="/clients" element={id ? <ClientsPage /> : <LoginPage />} />
      <Route path="/client/:id" element={id ? <ClientPage /> : <LoginPage />} />
      <Route path="/ticket" element={id ? <TicketPage /> : <LoginPage />} />
      <Route path="/sales" element={id ? <SalesPage /> : <LoginPage />} />
      <Route path="/sale" element={id ? <SalePage /> : <LoginPage />} />
    </Routes>
  );
};



export default AppRouter;