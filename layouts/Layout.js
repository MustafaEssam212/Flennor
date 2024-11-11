import Header from "@/components/Header";
import TopPageInfo from "@/components/TopPageInfo";
import Footer from "@/components/Footer";

const Layout = ({children}) => {



    return(

        <>

            <TopPageInfo />
            <Header />
            {children}
            <Footer />
        
        </>

    )
}


export default Layout;