import img from "../image/Group 3659.png";
import img1 from "../image/Group 3656.png";
import img2 from "../image/clarity_employee-group-line.png";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	useSelasOverviewQuery,
	useSubscriptionQuery,
	useTodaySelasQuery,
	useTopUserEarnedQuery,
	useTotalSellesQuery,
	useTotalUserEarnedQuery,
	useTotalUserQuery,
} from "../../../Redux/feature/ApiSlice";

const AdminDashboard = () => {
	// Fetch total sales for today
	const { data: salesData } = useTotalSellesQuery();
	const { data: todayData } = useTodaySelasQuery();
	const { data: totalUser } = useTotalUserQuery();
	const { data: totalUserEarned } = useTotalUserEarnedQuery();
	const { data: topUserEarned } = useTopUserEarnedQuery();
	const { data: SelasOverview } = useSelasOverviewQuery();
	const { data: subscription } = useSubscriptionQuery();

	console.log(subscription, "hello");

	const chartData =
		SelasOverview?.map((item) => ({
			name: item.month,
			sells2024: item.previous_year_sales,
			sells2025: item.current_year_sales,
		})) || [];

	// Transform subscription data to match the BarChart format
	const barChartData =
		subscription?.map((item) => ({
			name: item.date,
			pv: item.subscriptions,
		})) || [];

	return (
		<div className="p-5 mt-5">
			{/* Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<div className="bg-white rounded-lg p-4 flex justify-between items-center">
					<div>
						<p className="text-gray-500 text-[20px]">
							Total sales today
						</p>
						<h3 className="text-2xl font-semibold mt-1">
							${todayData?.today_sales}
						</h3>
					</div>
					<div className="bg-green-100 p-3 flex items-center justify-center rounded-full">
						<img src={img} className="h-9 p-1" alt="Sales icon" />
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 flex justify-between items-start">
					<div>
						<p className="text-gray-500 text-[20px]">
							Total Sells ({salesData?.last_month})
						</p>
						<h3 className="text-2xl font-semibold mt-1">
							${salesData?.last_month_sales}
						</h3>
					</div>
					<div className="bg-purple-100 p-3 rounded-full">
						<img
							src={img1}
							className="h-10 p-1"
							alt="Monthly sales icon"
						/>
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 flex justify-between items-start">
					<div>
						<p className="text-gray-500 text-[20px]">Total User</p>
						<h3 className="text-2xl font-semibold mt-1">
							{totalUser?.total_user}
						</h3>
					</div>
					<div className="bg-orange-100 p-3 rounded-full">
						<img src={img2} className="h-10 p-1" alt="Users icon" />
					</div>
				</div>
			</div>

			<div className="flex gap-4">
				{/* Chart 1 - Line Chart (2/3 width) */}
				<div className="bg-white rounded-lg p-4 mb-5 w-2/3">
					<h3 className="text-xl font-semibold mb-4">
						Sales Overview (Line Chart)
					</h3>
					<div style={{ height: "330px" }}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="name"
									padding={{ left: 30, right: 30 }}
								/>
								<YAxis
									domain={[
										0,
										Math.max(
											...chartData.map((d) =>
												Math.max(
													d.sells2024,
													d.sells2025
												)
											)
										),
									]}
									tickFormatter={(value) =>
										`${value / 1000}K`
									}
								/>
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="sells2024"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
									name="2024"
								/>
								<Line
									type="monotone"
									dataKey="sells2025"
									stroke="#ff9999"
									activeDot={{ r: 8 }}
									name="2025"
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Chart 2 - Bar Chart (2/5 width) */}
				<div className="bg-white rounded-lg p-4 h-[405px] w-2/5">
					<h3 className="text-xl font-semibold mb-4">
						Subscription Statistics (Bar Chart)
					</h3>
					<div style={{ height: "330px" }} className="-ml-8">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={barChartData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
								barSize={20}
							>
								<XAxis
									dataKey="name"
									scale="point"
									padding={{ left: 10, right: 10 }}
								/>
								<YAxis
									tickFormatter={(value) => `${value * 100}`} // Multiply Y-axis ticks by 100
								/>
								<Tooltip
									formatter={(value) => `${value * 100}`} // Multiply tooltip values by 100
								/>
								<Legend />
								<CartesianGrid strokeDasharray="3 3" />
								<Bar
									dataKey="pv"
									fill="#8884d8"
									background={{ fill: "#eee" }}
									name="Subscriptions Per Day"
									radius={[8, 8, 8, 8]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				{/* Table 1 */}
				<div className="w-1/3 bg-gray-50 rounded-lg overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-100">
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Role
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Total Number of Users
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Total Earnings
									</th>
								</tr>
							</thead>
							<tbody>
								{totalUserEarned?.map((earner, index) => (
									<tr
										key={index}
										className="border-b border-gray-100 hover:bg-gray-50"
									>
										<td className="py-3 px-4">
											<div className="flex items-center">
												<span className="text-gray-700">
													{earner.role}
												</span>
											</div>
										</td>
										<td className="py-3 px-4 text-gray-700 pl-20">
											{earner.count}
										</td>
										<td className="py-3 px-4 text-blue-500 font-medium pl-12">
											${earner.total_earnings}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Table 2 */}
				<div className="w-2/3 bg-gray-50 rounded-lg overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-100">
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Top earners this month
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										User ID
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Total
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-700">
										Current order
									</th>
								</tr>
							</thead>
							<tbody>
								{topUserEarned?.map((earner) => (
									<tr
										key={earner.user_id}
										className="border-b border-gray-100 hover:bg-gray-50"
									>
										<td className="py-3 px-4">
											<div className="flex items-center">
												<div className="h-6 w-6 rounded-full overflow-hidden mr-3">
													<img
														src={
															earner.image ||
															"/placeholder.png"
														}
														alt={earner.user_name}
														className="h-full w-full object-cover"
													/>
												</div>
												<span className="text-gray-700">
													{earner.user_name}
												</span>
											</div>
										</td>
										<td className="py-3 px-4 text-gray-700">
											{earner.user_id}
										</td>
										<td className="py-3 px-4 text-blue-500 font-medium">
											$
											{earner.total_earnings.toLocaleString(
												"en-US"
											)}
										</td>
										<td className="py-3 px-4 text-blue-500 font-medium">
											$
											{earner.current_order.toLocaleString(
												"en-US"
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
