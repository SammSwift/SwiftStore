import { useState, useEffect } from "react";
import { Table, Button, FileInput, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {
  useProfileMutation,
  useUploadProfileImageMutation,
} from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { HiMail, HiKey, HiUser } from "react-icons/hi";
import { FaTimesCircle, FaCheckCircle, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import ProfileCard from "../components/ProfileCard";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: myOrders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingProfileUpdate }] =
    useProfileMutation();
  const [uploadProfileImage] = useUploadProfileImageMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setProfileImage(userInfo.profileImage);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          profileImage,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast(error.data.message);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProfileImage(formData).unwrap();
      toast.success(res.message);
      setProfileImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="md:grid grid-cols-2 justify-items-center mt-10 mx-20">
      <div>
        <h2 className="text-2xl text-center font-serif mb-5 tracking-tight">
          My Profile
        </h2>
        <ProfileCard
          user={userInfo}
          content={
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
              <div className="space-y-2">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Username" />
                </div>
                <TextInput
                  id="name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Josh Bush"
                  required
                  icon={HiUser}
                />
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                  id="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  required
                  icon={HiMail}
                />
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Profile Image" />
                </div>
                <FileInput id="file" onChange={uploadFileHandler} />
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={HiKey}
                />
                <div className="mb-2 block">
                  <Label
                    htmlFor="confirmPassword"
                    value="Confirm Your Password"
                  />
                </div>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={HiKey}
                />
              </div>

              <Button
                type="submit"
                isProcessing={loadingProfileUpdate}
                color="dark"
              >
                Update Profile
              </Button>
            </form>
          }
        />
      </div>
      <div>
        <h2 className="text-2xl text-center font-serif">My Orders</h2>
        {isLoading ? (
          <Loader msg={"Retrieving your orders..."} />
        ) : error ? (
          <Message color="failure">{error}</Message>
        ) : myOrders.length === 0 ? (
          <Message>Oops! You have not made any orders</Message>
        ) : (
          <div className="mt-5">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>Order ID</Table.HeadCell>
                <Table.HeadCell>Total Price</Table.HeadCell>
                <Table.HeadCell>Payment Status</Table.HeadCell>
                <Table.HeadCell>Delivery Status</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Order Details</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y"></Table.Body>
              {myOrders.map((order) => (
                <Table.Row key={order._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-700">
                    {order._id}
                  </Table.Cell>
                  <Table.Cell className="font-bold text-gray-700">
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
                      <Button color="light">
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
    </div>
  );
};

export default ProfileScreen;
