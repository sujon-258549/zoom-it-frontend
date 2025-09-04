

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminDashboardQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "../../common/loding/LoadingPage";

const AdminDashboard = () => {
    const {data: adminData, isLoading} = useAdminDashboardQuery('')
    if(isLoading){
        return <LoadingPage/>
    }
    console.log(adminData)
  // Example data
  const chartData = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 200 },
    { name: "May", sales: 700 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Top Heading */}
      <h1 className="text-4xl font-bold">📊 Dashboard Overview</h1>
      <p className="text-gray-500">Quick insights into your store’s performance</p>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData.productLength}</p>
            <p className="text-sm text-gray-500">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData.categoryLength}</p>
            <p className="text-sm text-gray-500">+1 this month</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData?.totalQuantity}</p>
            <p className="text-sm text-gray-500">+30 today</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData.userLength}</p>
            <p className="text-sm text-gray-500">+5 new</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>📈 Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#155E75" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
