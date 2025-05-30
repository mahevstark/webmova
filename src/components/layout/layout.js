import Header from "../header/page";
import Sidebarlayout from "../side-bar-layout/page";

const Layout = ({ children, page }) => {
  return (
    <div className="flex  2xl:container 2xl:mx-auto">
      <Sidebarlayout page={page} />

      <div className="w-full ">
        <Header />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
