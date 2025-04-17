import Banner from "../Shared/Banner";
import ChaskiX from "../Shared/ChaskiX";
import Opportunities from "../Shared/Opportunities";
import Question from "../Shared/Question";
import Reviews from "../Shared/Reviews";
import ServiceAndBusiness from "../Shared/ServiceAndBusiness";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Opportunities/>
            <ServiceAndBusiness/>
            <ChaskiX/>
            <Reviews/>
            <Question/>
        </div>
    );
}

export default Home;
