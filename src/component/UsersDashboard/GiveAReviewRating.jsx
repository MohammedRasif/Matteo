import { useState } from "react";
import { Star } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function GiveAReviewRating({
	maxStars = 5,
	initialRating = 0,
	size = 24,
	onChange,
}) {
	const [rating, setRating] = useState(initialRating);
	const [hoverRating, setHoverRating] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const labels = [
		"Not good enough",
		"Average",
		"Good",
		"Liked it",
		"Excellent",
	];

	const handleRatingChange = (newRating) => {
		setRating(newRating);
		setSubmitted(false);
		if (onChange) {
			onChange(newRating);
		}
	};

	const handleSubmit = () => {
		setSubmitted(true);
		console.log("Rating submitted:", rating);
	};

	return (
		<div className="flex flex-col items-center p-6 space-y-5">
			<h2 className="text-xl font-semibold mb-2 text-[12px] text-[#154153]">
				How was your working experience
			</h2>

			{/* Labels moved above stars */}
			<div className="h-5">
				{hoverRating > 0 ? (
					<p className="text-[18px] text-[#154153] font-medium text-center">
						{labels[hoverRating - 1]}
					</p>
				) : rating > 0 && !submitted ? (
					<p className="text-[18px] text-[#154153] font-medium text-center">
						{labels[rating - 1]}
					</p>
				) : (
					<p className="text-sm text-transparent"> </p> // Invisible placeholder to maintain height
				)}
			</div>

			<div className="flex space-x-1 mb-4 gap-4">
				{[...Array(maxStars)].map((_, index) => {
					const starValue = index + 1;
					return (
						<button
							key={index}
							type="button"
							className="focus:outline-none cursor-pointer border border-[#5C91B1] rounded w-[42px] h-[34px] flex items-center justify-center"
							onClick={() => handleRatingChange(starValue)}
							onMouseEnter={() => setHoverRating(starValue)}
							onMouseLeave={() => setHoverRating(0)}
						>
							<Star
								size={size}
								className={`
                  ${
						(hoverRating || rating) >= starValue
							? "fill-yellow-400 text-yellow-400"
							: "text-gray-300"
					}
                  transition-colors duration-150
                `}
							/>
						</button>
					);
				})}
			</div>

			{submitted && rating > 0 && (
				<p className="text-green-600 font-medium mb-4">
					Thank you for your {rating}-star rating!
				</p>
			)}

			<div className="py-8 w-full">
				<span>Describe your experience (Optional)</span>
				<textarea
					className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-4"
					placeholder="Enter here"
				></textarea>
			</div>

			<button
				onClick={handleSubmit}
				disabled={rating === 0}
				className={`
          px-4 py-2 rounded-md text-white font-medium
          ${
				rating === 0
					? "cursor-not-allowed bg-[#848239] "
					: "btn btn-active bg-[#848239] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer"
			}
          transition-colors duration-200
        `}
			>
				Submit
			</button>
		</div>
	);
}
