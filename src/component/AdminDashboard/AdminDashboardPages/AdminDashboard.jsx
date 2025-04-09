import img from "../image/Group 3659.png";
import img1 from "../image/Group 3656.png";
import img2 from "../image/clarity_employee-group-line.png";
import {
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
    // Updated data to match the chart in the image
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

    return (
        <div className="p-5">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Total sales today */}
                <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total sales today</p>
                        <h3 className="text-2xl font-semibold mt-1">$ 11,375</h3>
                    </div>
                    <div className="bg-green-100 p-3 flex items-center justify-center rounded-full">
                        <img src={img} className="h-9 p-1" alt="Sales icon" />
                    </div>
                </div>

                {/* Total Sells (Jan) */}
                <div className="bg-white rounded-lg p-4 flex justify-between items-start shadow-sm">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total Sells (Jan)</p>
                        <h3 className="text-2xl font-semibold mt-1">$ 11,375</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                        <img src={img1} className="h-10 p-1" alt="Monthly sales icon" />
                    </div>
                </div>

                {/* Total User */}
                <div className="bg-white rounded-lg p-4 flex justify-between items-start shadow-sm">
                    <div>
                        <p className="text-gray-500 text-[20px]">Total User</p>
                        <h3 className="text-2xl font-semibold mt-1">375</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                        <img src={img2} className="h-10 p-1" alt="Users icon" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
                <div style={{ height: '333px' }}>
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
                                stroke="#8884d8" // Blue color for 2024
                                activeDot={{ r: 8 }}
                                name="2024"
                                
                            />
                            <Line
                                type="monotone"
                                dataKey="sells2025"
                                stroke="#ff9999" // Pink color for 2025
                                activeDot={{ r: 8 }}
                                name="2025"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;