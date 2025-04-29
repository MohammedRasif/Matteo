import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img from "../image/Rectangle.png";

const Reviews = () => {
    const testimonials = [
        {
            id: 1,
            name: "David Noel",
            title: "Marketing Director",
            quote:
                "Gain instant access to actionable data with a real-time dashboard. Track key metrics, monitor engagement, and optimize your lead generation strategy on the go. Make data-driven decisions with up-to-the-minute insights.",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            title: "Product Manager",
            quote:
                "The analytics platform transformed how we approach customer acquisition. With comprehensive reporting and intuitive visualizations, we've increased conversion rates by 37% in just three months.",
        },
        {
            id: 3,
            name: "Michael Chen",
            title: "CTO",
            quote:
                "Implementation was seamless and the support team was exceptional. The platform's predictive analytics feature has helped us anticipate market trends and stay ahead of competitors.",
        },
    ];

    const circleColors = {
        main: "bg-[#2CB9FF]",
        secondary: "bg-[#0A93D7]",
        tertiary: "bg-[#2CB9FF]",
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div id="reviews" className=" flex items-center justify-center  roboto p-4">
            <div className="container p-10 py-20 w-full rounded-lg ">
                <div className="text-center mb-12">
                    <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5  tracking-wider">Reviews</h1>
                    <p className="text-center text-[18px] text-gray-500 mb-20">Customer Success Stories</p>
                </div>

                <div className="relative overflow-hidden">
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white transition-colors"
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white transition-colors"
                        aria-label="Next review"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="flex-shrink-0 w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 px-12 py-16">
                                <div className="flex flex-col items-center ">
                                    <div className="w-40 h-40 relative mb-4">
                                        <div
                                            className={`absolute w-36 h-36 -top-18 rounded-full ${circleColors.tertiary} opacity-90 right-32`}
                                        ></div>
                                        <div
                                            className={`absolute w-48 h-48 -top-10 rounded-full ${circleColors.secondary} opacity-90 right-16`}
                                        ></div>
                                        <div
                                            className={`absolute h-56 w-56 rounded-full right-6 -bottom-[45px] flex items-center justify-center text-[18px] font-semibold text-gray-900 dark:text-white`}
                                        >
                                            <img src={img} className="rounded-full h-full w-full object-cover" alt={testimonial.name} />
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-2xl text-center md:text-left">
                                    <p className="text-xl leading-relaxed text-gray-700 dark:text-white mb-4">
                                        "{testimonial.quote}"
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{testimonial.name}</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">{testimonial.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-gray-900 dark:bg-white" : "bg-gray-400 dark:bg-white/30"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;