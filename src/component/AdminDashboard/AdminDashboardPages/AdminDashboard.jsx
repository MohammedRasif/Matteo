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
} from 'recharts';

const AdminDashboard = () => {
    // Data for Line Chart (Chart 1)
    const data = [
        { name: 'Jan', sells2024: 25000, sells2025: 100000 },
        { name: 'Feb', sells2024: 75000, sells2025: 25000 },
        { name: 'Mar', sells2024: 50000, sells2025: 75000 },
        { name: 'Apr', sells2024: 40000, sells2025: 30000 },
        { name: 'May', sells2024: 60000, sells2025: 40000 },
        { name: 'Jun', sells2024: 50000, sells2025: 30000 },
        { name: 'Jul', sells2024: 70000, sells2025: 50000 },
        { name: 'Aug', sells2024: 25000, sells2025: 75000 },
        { name: 'Sep', sells2024: 60000, sells2025: 25000 },
        { name: 'Oct', sells2024: 40000, sells2025: 50000 },
        { name: 'Nov', sells2024: 25000, sells2025: 75000 },
        { name: 'Dec', sells2024: 75000, sells2025: 50000 },
    ];

    // Data for Bar Chart (Chart 2)
    const data1 = [
        { name: 'Sat', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Sub', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mon', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Tues', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Wed', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Thu', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Fri', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const topEarners = [
        {
            id: 1,
            username: "username1335",
            userId: "46593292",
            total: "$33,000",
            currentOrder: "$33,000",
            profileImage: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
        },
        {
            id: 2,
            username: "username1335",
            userId: "46593292",
            total: "$33,000",
            currentOrder: "$33,000",
            profileImage: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
        },
        {
            id: 3,
            username: "username1335",
            userId: "46593292",
            total: "$33,000",
            currentOrder: "$33,000",
            profileImage: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
        },
        {
            id: 4,
            username: "username1335",
            userId: "46593292",
            total: "$33,000",
            currentOrder: "$33,000",
            profileImage: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
        },
       
    ]

    return (
        <div className="p-5 mt-5">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 flex justify-between items-center ">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total sales today</p>
                        <h3 className="text-2xl font-semibold mt-1">$ 11,375</h3>
                    </div>
                    <div className="bg-green-100 p-3 flex items-center justify-center rounded-full">
                        <img src={img} className="h-9 p-1" alt="Sales icon" />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 flex justify-between items-start ">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total Sells (Jan)</p>
                        <h3 className="text-2xl font-semibold mt-1">$ 11,375</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                        <img src={img1} className="h-10 p-1" alt="Monthly sales icon" />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 flex justify-between items-start ">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total User</p>
                        <h3 className="text-2xl font-semibold mt-1">375</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                        <img src={img2} className="h-10 p-1" alt="Users icon" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Chart 1 - Line Chart (2/3 width) */}
                <div className="bg-white rounded-lg p-4 mb-5 w-2/3">
                    <h3 className="text-xl font-semibold mb-4">Sales Overview (Line Chart)</h3>
                    <div style={{ height: '330px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                <YAxis domain={[0, 100000]} tickFormatter={(value) => `${value / 1000}K`} />
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
                    <h3 className="text-xl font-semibold mb-4">Page Statistics (Bar Chart)</h3>
                    <div style={{ height: '330px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data1}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar
                                    dataKey="pv"
                                    fill="#8884d8"
                                    background={{ fill: '#eee' }}
                                    name="Upgrades Per Day" // Custom label for the legend
                                    radius={[8, 8, 8, 8]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>



            </div>
            <div className="flex items-center space-x-4">
                {/* table */}
                <div className=" w-1/3  bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Top earners this month</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Current order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topEarners.map((earner) => (
                                    <tr key={earner.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                               
                                                <span className="text-gray-700">{earner.username}</span>
                                                <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                                                    
                                                    </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{earner.userId}</td>
                                        <td className="py-3 px-4 text-blue-500 font-medium">{earner.currentOrder}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* table 2 */}
                <div className=" w-2/3 bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Top earners this month</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Current order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topEarners.map((earner) => (
                                    <tr key={earner.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                                                    <img
                                                        src={earner.profileImage || "/placeholder.svg"}
                                                        alt={earner.username}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-gray-700">{earner.username}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{earner.userId}</td>
                                        <td className="py-3 px-4 text-blue-500 font-medium">{earner.total}</td>
                                        <td className="py-3 px-4 text-blue-500 font-medium">{earner.currentOrder}</td>
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