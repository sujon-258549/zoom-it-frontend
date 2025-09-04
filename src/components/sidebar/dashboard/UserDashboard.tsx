
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  Home, 
  Mail, 
  Package, 
  Settings, 
  ShoppingCart, 
  User, 
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Eye
} from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";

const UserDashboard = () => {

  const stats = [
    { title: "Total Orders", value: "248", icon: ShoppingCart, trend: "+12%", description: "From last week" },
    { title: "Total Spent", value: "$4,892", icon: DollarSign, trend: "+8%", description: "From last week" },
    { title: "Wishlist Items", value: "16", icon: Package, trend: "+2", description: "Recently added" },
    { title: "Support Tickets", value: "3", icon: HelpCircle, trend: "-1", description: "Recently solved" },
  ];

  const recentOrders = [
    { id: "#ORD-7892", date: "2025-09-05", amount: "$189.00", status: "Delivered" },
    { id: "#ORD-7891", date: "2025-09-04", amount: "$245.50", status: "Processing" },
    { id: "#ORD-7890", date: "2025-09-03", amount: "$76.99", status: "Delivered" },
    { id: "#ORD-7889", date: "2025-09-02", amount: "$132.00", status: "Shipped" },
    { id: "#ORD-7888", date: "2025-09-01", amount: "$49.99", status: "Delivered" },
  ];

  const navigation = [
    { name: "Dashboard", href: "#", icon: Home, current: true },
    { name: "Orders", href: "#", icon: ShoppingCart, current: false },
    { name: "Wishlist", href: "#", icon: Package, current: false },
    { name: "Personal Info", href: "#", icon: User, current: false },
    { name: "Payment Methods", href: "#", icon: CreditCard, current: false },
    { name: "Security", href: "#", icon: Settings, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="pl-10 w-64"
                  placeholder="Search..."
                  type="search"
                />
              </div>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://res.cloudinary.com/ddzoqma5y/image/upload/v1756747567/bvjqjzdf1p0w5mlq0ogs.webp"
                  alt="User profile"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Finn Gardner</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium ${item.current
                        ? "bg-cyan-50 text-cyan-700 border-l-4 border-cyan-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Download invoices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white overflow-hidden mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, Finn!</h2>
                    <p className="opacity-90">Here's what's happening with your account today.</p>
                  </div>
                  <Button variant="secondary" className="mt-4 md:mt-0 bg-white text-cyan-700 hover:bg-gray-100">
                    View Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-cyan-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center pt-1">
                      {stat.trend.startsWith('+') ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
                      )}
                      <p className="text-xs text-muted-foreground">
                        <span className={stat.trend.startsWith('+') ? "text-green-500" : "text-red-500"}>
                          {stat.trend}
                        </span>{" "}
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your most recent purchases</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;