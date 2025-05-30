import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFaqDataQuery } from "../../Redux/feature/ApiSlice";
import { useLocation } from "react-router-dom";

// FAQ Question and Answer Component
const FaqQuestionAns = ({
	item,
	index,
	activeItem,
	toggleItem,
	isAdmin,
	onEdit,
	onDelete,
}) => {
	return (
		<div className="">
			<div
				onClick={() => toggleItem(index)}
				className={`py-4 text-[#345168] bg-white px-3 border border-gray-300 text-left text-base font-medium flex justify-between items-center w-full hover:cursor-pointer ${
					activeItem === index ? "rounded-t-xl" : "rounded-xl"
				}`}
			>
				<div>{item.question}</div>
				<div className="flex items-center justify-center gap-8">
					{isAdmin && (
						<div className="flex gap-4">
							<button
								className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 hover:cursor-pointer"
								onClick={onEdit}
							>
								Edit
							</button>
							<button
								className="px-3 hover:cursor-pointer py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
								onClick={onDelete}
							>
								Delete
							</button>
						</div>
					)}
					<ChevronDown
						className={`transition-transform duration-300 ${
							activeItem === index ? "rotate-180" : ""
						}`}
					/>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
					activeItem === index
						? "max-h-96 opacity-100 pb-5 rounded-b-xl border-x border-gray-300"
						: "max-h-0 opacity-0"
				}`}
			>
				<div className="py-4 px-10">
					<ul>
						{item.answer &&
							item.answer.split(",").map((q, i) => (
								<li
									className="text-gray-600 text-sm list-disc"
									key={i}
								>
									{q}
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
};

const Faq = () => {
	const [activeItem, setActiveItem] = useState(0);
	const [faqItems, setFaqItems] = useState([]);
	const { data, error } = useFaqDataQuery();
	const location = useLocation();

	useEffect(() => {
		if (data) {
			setFaqItems(data);
		}
		console.log(data);
	}, [data]);

	const toggleItem = (index) => {
		setActiveItem(activeItem === index ? -1 : index);
	};

	return (
		<div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
			<h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5 py-10 tracking-wider">
				FREQUENTLY ASKED QUESTIONS
			</h1>
			<div className="flex flex-col md:flex-row">
				<div className="md:w-2/3 pr-4">
					<div className="h-[600px]">
						{faqItems.map((item, index) => (
							<FaqQuestionAns
								key={`item-${index}`}
								item={item}
								index={index}
								activeItem={activeItem}
								toggleItem={toggleItem}
							/>
						))}
					</div>
				</div>
				<div className="md:w-1/3 mt-10 md:mt-0 flex justify-center items-center">
					<div className="bg-[#848239] rounded-full w-64 h-64 flex flex-col justify-center items-center text-white p-6 text-center">
						<h3 className="text-2xl font-semibold mb-2">FAQ's</h3>
						<p className="text-sm">
							Let us know if you have any other questions, our
							team is always happy to help!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faq;
export { FaqQuestionAns };
