import { Card, Button, ListGroup } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderSlice";
import Message from "../components/Message";
import { FaCreditCard } from "react-icons/fa";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [placeOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await placeOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <div className="grid grid-cols-3 px-5 mt-10 gap-5">
      <div className="col-span-2">
        <ListGroup className="border-none">
          <ListGroup.Item>
            <div>
              <p className="text-left font-serif font-semibold my-3 md:text-2xl">
                Order Items
              </p>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup className="border-none">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <div className="grid grid-cols-3 items-center ">
                        <div>
                          <img
                            src={item.image}
                            className="rounded-lg"
                            alt={item.name}
                          />
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
              )}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="flex w-full justify-around my-5">
              <div className="text-left w-40">
                <span className="text-lg underline tracking-tight">
                  {" "}
                  Shipping Address{" "}
                </span>
                <p className="text-gray-700 mt-2 font-normal">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
              <div className="text-left">
                <span className="text-lg underline tracking-tight">
                  Payment Method
                </span>
                <p className="text-gray-700 mt-2 font-normal">
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div>
        <Card className="">
          <ListGroup className="border-none space-y-6">
            <ListGroup.Item>
              <div className="font-serif tracking-tight font-bold text-2xl text-center">
                Order Summary
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Items </span>
                <span>${cart.itemsPrice}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Shipping </span>
                <span>${cart.shippingPrice}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="flex w-full justify-between">
                <span className="text-gray-500">Tax </span>
                <span>${cart.taxPrice}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="flex w-full justify-between">
                <span className="text-gray-500 text-lg">Total </span>
                <span className="font-bold text-lg">${cart.totalPrice}</span>
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message color="failure">{error}</Message>}
            </ListGroup.Item>
          </ListGroup>
          <Button
            type="button"
            gradientDuoTone="tealToLime"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
            isProcessing={isLoading}
          >
            <FaCreditCard className="mr-2 h-6 w-6" />
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
