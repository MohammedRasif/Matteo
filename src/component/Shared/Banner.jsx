import img from "../image/Image+Background.png";
import img1 from "../image/man.png";

const Banner = () => {
    return (
        <div
            className="flex items-center relative overflow-hidden "
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "700px", // Banner height set to 700px
            }}
        >
            {/* Centered container with max-w-7xl */}
            <div className="max-w-[160vh] mx-auto flex flex-col md:flex-row items-center w-full px-4">
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-white px-4 md:px-8 lg:px-12 py-16 z-10 nunito">
                    <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
                        Win more jobs and get <br /> more jobs done right.
                    </h1>
                    <p className="text-md mb-8 max-w-lg text-gray-200">
                        Get everything done without the late nights. Increase your revenue and
                        reputation with a single platform built to help home service businesses
                        succeed.
                    </p>
                    <button className="bg-[#2E9DE0] hover:bg-[#2e81e0] text-white font-medium py-3 px-8 rounded-full transition duration-300 cursor-pointer">
                        Get Started Now
                    </button>
                    <p className="mt-6 text-sm font-medium">
                        Put ChasiX to work for you anytime.
                    </p>
                </div>

                {/* Image Section */}
                <div className="hidden md:block absolute right-20 bottom-0">
                    <img
                        src={img1}
                        alt="Man"
                        className="object-contain object-bottom"
                        style={{ maxHeight: "600px" }} // Image height set to 600px
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;