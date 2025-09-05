import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useGetMyOrderQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "@/components/common/loding/LoadingPage";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  orderQuantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  deliveryStatus: boolean;
  paymentStatus: boolean;
  createdAt: string;
  updatedAt: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  product: OrderItem[];
}

const UserDashboard = () => {
  const { data: ordersData, isLoading } = useGetMyOrderQuery('');
  
  if (isLoading) {
    return <LoadingPage/>;
  }

  // Safely handle potentially undefined data
  const orders = ordersData?.data || [];
  
  // Calculate dashboard stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const deliveredOrders = orders.filter(order => order.deliveryStatus).length;
  const paidOrders = orders.filter(order => order.paymentStatus).length;

  const stats = [
    { 
      title: "Total Orders", 
      value: totalOrders.toString(), 
      icon: ShoppingCart, 
      description: "All your orders" 
    },
    { 
      title: "Total Spent", 
      value: `$${totalSpent.toFixed(2)}`, 
      icon: DollarSign, 
      description: "Total amount spent" 
    },
    { 
      title: "Delivered", 
      value: deliveredOrders.toString(), 
      icon: Package, 
      description: "Delivered orders" 
    },
    { 
      title: "Paid", 
      value: paidOrders.toString(), 
      icon: CreditCard, 
      description: "Paid orders" 
    },
  ];

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and track your orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
          
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500">You haven't placed any orders yet.</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order._id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.orderId.name}</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        Placed on {formatDate(order.createdAt)}
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Badge 
                        className={order.deliveryStatus ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {order.deliveryStatus ? "Delivered" : "Processing"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.product.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <p className="font-medium">{item.id.name || "Unknown Product"}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.orderQuantity}</p>
                            </div>
                            <p className="font-medium">
                              ${item.id.price ? (item.id.price * item.orderQuantity).toFixed(2) : "0.00"}
                            </p>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total</span>
                          <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h3 className="font-medium mb-3">Order Details</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Status</h4>
                          <div className="flex items-center">
                            {order.paymentStatus ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span className="text-green-700">Paid</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                <span className="text-red-700">Pending</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Status</h4>
                          <div className="flex items-center">
                            {order.deliveryStatus ? (
                              <>
                                <Truck className="h-5 w-5 text-green-500 mr-2" />
                                <span className="text-green-700">Delivered</span>
                              </>
                            ) : (
                              <>
                                <Package className="h-5 w-5 text-yellow-500 mr-2" />
                                <span className="text-yellow-700">Processing</span>
                              </>
                            )}
                          </div>
                        </div>

                        {order.address && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
                            <div className="text-sm text-gray-600">
                              {order.address && <p>{order?.address?.address}</p>}
                            
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;