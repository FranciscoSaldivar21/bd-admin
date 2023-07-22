import { SideBar } from "../components/SideBar";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full">
      <SideBar />
      <div className="w-full mt-12 pl-72 pr-4">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};
