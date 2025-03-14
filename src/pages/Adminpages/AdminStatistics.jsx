import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const AdminStatistics = () => {
  // Sample Data
  const revenueData = [
    { month: "Jan", 2024: 80, 2023: 60, 2022: 40 },
    { month: "Feb", 2024: 90, 2023: 65, 2022: 45 },
    { month: "Mar", 2024: 95, 2023: 70, 2022: 50 },
    { month: "Apr", 2024: 70, 2023: 75, 2022: 55 },
    { month: "May", 2024: 85, 2023: 85, 2022: 60 },
    { month: "Jun", 2024: 75, 2023: 95, 2022: 65 },
  ];

  const projectData = [
    { name: "Jan", projects: 30 },
    { name: "Feb", projects: 45 },
    { name: "Mar", projects: 60 },
    { name: "Apr", projects: 50 },
    { name: "May", projects: 70 },
    { name: "Jun", projects: 85 },
  ];

  const salesData = [
    { name: "Completed", value: 400 },
    { name: "Pending", value: 300 },
    { name: "Canceled", value: 100 },
  ];

  const performanceData = [
    { subject: "Orders", A: 120, fullMark: 150 },
    { subject: "Revenue", A: 90, fullMark: 150 },
    { subject: "Customers", A: 110, fullMark: 150 },
    { subject: "Retention", A: 100, fullMark: 150 },
    { subject: "Satisfaction", A: 140, fullMark: 150 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 bg-background min-h-screen">
      {/* Revenue Forecast - Line Chart */}
      <div className="bg-cardback shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">Revenue Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="2024" stroke="#0088FE" />
            <Line type="monotone" dataKey="2023" stroke="#FF6384" />
            <Line type="monotone" dataKey="2022" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Projects Growth - Bar Chart */}
      <div className="bg-cardback shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Projects Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projectData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="projects" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Overview - Pie Chart */}
      <div className="bg-cardback shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={salesData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics - Radar Chart */}
      <div className="bg-cardback shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Metrics" dataKey="A" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;
