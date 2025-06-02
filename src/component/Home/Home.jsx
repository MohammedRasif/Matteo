import Banner from "../Shared/Banner";
import Pricing from "../Shared/Pricing";
import Opportunities from "../Shared/Opportunities";
import Question from "../Shared/Question";
import Reviews from "../Shared/Reviews";
import ServiceAndBusiness from "../Shared/ServiceAndBusiness";

const Home = () => {
	return (
		<div>
			<Banner />
			<Opportunities />
			<ServiceAndBusiness />
			<Pricing />
			<Reviews />
			<Question />
		</div>
	);
};

export default Home;
