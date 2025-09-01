import { Outlet } from "react-router-dom";
import Navbar from "../navbarAndFooter/Navbar";
import FooterSection from "../navbarAndFooter/Footer";


const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <FooterSection />
        </div>
    );
};

export default Main;