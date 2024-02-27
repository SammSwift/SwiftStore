import { Table, Button } from "flowbite-react";
import { FaTimesCircle, FaCheckCircle, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../slices/orderSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

import AdminNav from "../components/AdminNav";

const OrderListScreen = () => {
  const { data: allOrders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <>
      <AdminNav />
      <h1 className="text-center font-bold text-2xl tracking-tight mt-10 mb-3">
        Manage Orders
      </h1>
      <div className="flex justify-center">
        {isLoading ? (
          <Loader msg={"Retrieving all orders..."} />
        ) : error ? (
          <Message color="failure">{error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>OrderID</Table.HeadCell>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Total</Table.HeadCell>
                <Table.HeadCell>Payment Status</Table.HeadCell>
                <Table.HeadCell>Delivery Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Order Details</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y"></Table.Body>
              {allOrders.map((order) => (
                <Table.Row key={order._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {order._id}
                  </Table.Cell>
                  <Table.Cell>{order.user.name}</Table.Cell>
                  <Table.Cell className="font-bold">
                    ${order.totalPrice}
                  </Table.Cell>
                  <Table.Cell>
                    {order.isPaid ? (
                      <FaCheckCircle color="green" />
                    ) : (
                      <FaTimesCircle color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {order.isDelivered ? (
                      <FaCheckCircle color="green" />
                    ) : (
                      <FaTimesCircle color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>{order.createdAt.substring(0, 10)}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/order/${order._id}`}>
                      <Button color="light" size="sm">
                        <FaEye />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
