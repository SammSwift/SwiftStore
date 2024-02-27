import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Card, ListGroup } from "flowbite-react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/orderSlice";

import { FaTimesCircle } from "react-icons/fa";
import { FaCircleCheck, FaMotorcycle } from "react-icons/fa6";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order payment successful🎉");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const updateDeliveryHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order delivered!");
      refetch();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message color="failure">{error}</Message>
  ) : (
    <>
      <div className="sm: space-y-5 md:grid grid-cols-3 px-5 mt-10 gap-5">
        <div className="col-span-2">
          <ListGroup className="border-none">
            <ListGroup.Item>
              <div className="flex w-full justify-around my-5">
                <div className="text-left w-40">
                  <span className="text-lg tracking-tight underline">
                    Shipping Address
                  </span>
                  <p className="font-normal text-gray-700 mt-2">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>

                <div className="text-left">
                  <span className="text-lg tracking-tight underline">
                    Payment Status{" "}
                  </span>
                  {order.isPaid ? (
                    <div className="flex items-center gap-2 font-normal text-gray-700 mt-2">
                      <FaCircleCheck color="green" />

                      <p> Paid on {order.paidAt.substring(0, 10)}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 font-normal text-gray-700 mt-2">
                      <FaTimesCircle color="red" />
                      <p>Not Paid</p>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <span className="text-lg tracking-tight underline">
                    Delivery Status{" "}
                  </span>
                  {order.isDelivered ? (
                    <div className="flex items-center gap-2 font-normal text-gray-700 mt-2">
                      <FaCircleCheck color="green" />

                      <p> Delivered on {order.deliveredAt.substring(0, 10)}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 font-normal text-gray-700 mt-2">
                      <FaTimesCircle color="red" />
                      <p>Not Delivered</p>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <span className="text-lg tracking-tight underline">
                    Payment Method{" "}
                  </span>
                  <p className="font-normal text-gray-700 mt-2">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <p className="text-left font-serif font-semibold my-3 md:text-2xl">
                  Order Items
                </p>

                <ListGroup className="border-none">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <div className="grid grid-cols-3 items-center ">
                        <div>
                          <img src={item.image} rounded-lg alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.price * item.qty}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <Card className="">
            <ListGroup className="border-none space-y-6">
              <ListGroup.Item>
                <div className="font-serif font-bold text-2xl text-center">
                  Order Summary
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="flex w-full justify-between">
                  <span className="text-gray-500">Items </span>
                  <span>${order.itemsPrice}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="flex w-full justify-between">
                  <span className="text-gray-500">Shipping </span>
                  <span>${order.shippingPrice}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="flex w-full justify-between">
                  <span className="text-gray-500">Tax </span>
                  <span>${order.taxPrice}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="flex w-full justify-between">
                  <span className="text-gray-500 text-lg">Total </span>
                  <span className="font-bold text-lg">${order.totalPrice}</span>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && toast.info("Making Payment...")}
                    {isPending ? (
                      toast("Connecting to PayPal...")
                    ) : (
                      <div>
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup.Item>

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      color="light"
                      onClick={updateDeliveryHandler}
                      isProcessing={loadingDeliver}
                    >
                      <FaMotorcycle className="mr-1 h-5 w-5" />
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
