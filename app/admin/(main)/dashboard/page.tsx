import PopularProducts from "./components/PopularProducts";
import RecentOrders from "./components/RecentOrders";
import SalesTrend from "./components/SalesTrend";
import OrderStatus from "./components/OrderStatus";
import TopStats from "./components/TopStats";

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Stats */}

      <TopStats />
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrend />
        <OrderStatus />
      </div>

      {/* Recent Orders + Popular Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  );
}
