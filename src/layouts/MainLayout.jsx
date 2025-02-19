import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaChevronUp } from "react-icons/fa";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop
        smooth
        component={<FaChevronUp className="text-text-primary  text-3xl" />}
      />
    </div>
  );
};

export default MainLayout;
