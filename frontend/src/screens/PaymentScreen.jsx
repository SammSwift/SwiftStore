import { Label, Radio, Card, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  console.log(paymentMethod);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <h1 className="font-serif font-semibold text-center text-3xl text-gray-900 my-10">
        Payment Method
      </h1>
      <div className="flex justify-center">
        <Card className="max-w-sm">
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4">Select your payment method</legend>
            <div className="flex items-center gap-2">
              <Radio
                id="paypal"
                name="paymentOption"
                value="PayPal"
                defaultChecked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Label htmlFor="paypal">PayPal or Credit Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="stripe"
                name="paymentOption"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Label htmlFor="stripe">Stripe</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="debit-card"
                name="paymentOption"
                value="Debit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Label htmlFor="debit-card">Debit Card</Label>
            </div>
          </fieldset>
          <Button gradientDuoTone="tealToLime" onClick={submitHandler}>
            <FaCreditCard className="mr-2 h-6 w-6" />
            Proceed to Order
          </Button>
        </Card>
      </div>
    </>
  );
};

export default PaymentScreen;
