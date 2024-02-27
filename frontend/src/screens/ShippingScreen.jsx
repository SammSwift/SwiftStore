import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { Card } from "flowbite-react";
import {
  FaLocationDot,
  FaCity,
  FaMapLocationDot,
  FaLocationArrow,
} from "react-icons/fa6";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <h1 className="font-serif font-semibold text-center text-3xl text-gray-900 my-10">
        Shipping Address
      </h1>
      <div className="flex justify-center">
        <Card className="w-80 ">
          <form className="flex flex-col gap-5" onSubmit={submitHandler}>
            <div className="space-y-3">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput
                id="address"
                value={address}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                required
                icon={FaLocationDot}
              />
              <div className="mb-2 block">
                <Label htmlFor="city" value="City" />
              </div>
              <TextInput
                id="city"
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
                required
                icon={FaCity}
              />
              <div className="mb-2 block">
                <Label htmlFor="postalCode" value="PostalCode" />
              </div>
              <TextInput
                id="postalcode"
                value={postalCode}
                type="text"
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter Postal Code"
                required
                icon={FaLocationArrow}
              />
              <div className="mb-2 block">
                <Label htmlFor="postalCode" value="Country" />
              </div>
              <TextInput
                id=" country"
                value={country}
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter Country"
                required
                icon={FaMapLocationDot}
              />
            </div>

            <Button type="submit" outline gradientDuoTone="tealToLime">
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ShippingScreen;
