import AdminNav from "../components/AdminNav";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetAllOrdersQuery } from "../slices/orderSlice";
import { useGetUsersQuery } from "../slices/userApiSlice";

const SummaryScreen = () => {
  const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  return (
    <>
      <AdminNav />
      {isLoading ? (
        <Loader msg="Fetching stats..." />
      ) : error ? (
        <Message color="failure">{error}</Message>
      ) : (
        <>
          <h1 className="text-center font-bold text-3xl tracking-tight mt-10 mb-5">
            Stats
          </h1>
          <div className="grid grid-cols-2 justify-items-center gap-10">
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">
                $
                {allOrders.reduce(
                  (total, order) => total + order.totalPrice,
                  0
                )}
              </span>
              <span className="text-gray-500">Total Sales</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">10</span>
              <span>Total Products</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">
                {allOrders.length}
              </span>
              <span>Total Orders</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">
                {allOrders.filter((order) => order.isPaid === true).length}
              </span>
              <span>Paid Orders</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">
                {allOrders.filter((order) => order.isPaid === false).length}
              </span>
              <span>Unpaid Orders</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl tracking-tight">
                {loadingUsers ? <></> : <>{users.length}</>}
              </span>
              <span>Total Users</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SummaryScreen;
