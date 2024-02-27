import { ListGroup } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { Button } from "flowbite-react";
import { Select, Card } from "flowbite-react";
import { FaCreditCard } from "react-icons/fa";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (item) => {
    dispatch(removeFromCart(item._id));
    toast.info(`${item.name} removed from cart!`);
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <Message>
            Your cart🛒 is empty😔 <Link to="/">Continue Shopping</Link>
          </Message>
        </>
      ) : (
        <>
          <h1 className="font-serif tracking-tight font-semibold text-center text-3xl text-gray-900 my-6">
            Shopping Cart
          </h1>

          <div className="md:flex wrap justify-center mt-10 gap-12">
            <div className="mb-5">
              <ListGroup className="border-none">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <div className="grid grid-cols-5 items-center gap-5">
                      <div>
                        <Link to={`/products/${item._id}`}>
                          <img
                            className="rounded-lg w-20"
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>
                      </div>
                      <div>
                        <span
                          className="flex wrap text-center"
                          style={{
                            maxWidth: "150px",
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div>
                        <span className="">${item.price}</span>
                      </div>
                      <div>
                        <Select
                          value={item.qty}
                          required
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {Array.from(
                            { length: item.countInStock },
                            (_, index) => (
                              <option key={index}>{index + 1}</option>
                            )
                          )}
                        </Select>
                      </div>

                      <div>
                        <Button
                          color="light"
                          className="border-none"
                          onClick={() => {
                            removeFromCartHandler(item);
                          }}
                        >
                          <FaTrash className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="max-w-sm">
              <Card>
                <div className="flex justify-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    Subtotal
                  </h5>
                  <span className="text-2xl font-bold text-teal-600">
                    $
                    {cartItems
                      .reduce((a, item) => a + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Taxes and shipping fees are calculated at checkout.
                </p>
                <Button gradientDuoTone="tealToLime" onClick={checkOutHandler}>
                  <FaCreditCard className="mr-2 h-6 w-6" />
                  Proceed to Checkout
                </Button>

                <Link to="/" className="flex items-center justify-center">
                  <HiArrowCircleLeft className="mr-2 w-6 h-6" />
                  <span className="font-semibold">Continue Shopping</span>
                </Link>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartScreen;
