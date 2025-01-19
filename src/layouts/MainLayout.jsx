import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowAltCircleUp } from "react-icons/fa";



const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTop smooth component={<FaArrowAltCircleUp className="text-green-600 text-3xl" />} />
        </div>
    );
};

export default MainLayout;