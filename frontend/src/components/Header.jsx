import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const location = useLocation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Navbar
      rounded
      className="bg-gray-100 font-serif text-white-900 border-gray-200 p-6"
    >
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold mx-5">
          <span className="text-gray-500">SwiftShop</span>
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-10">
        <SearchBox />
        <Navbar.Collapse>
          <Link to="/" active={location.pathname === "/"} className="flex">
            <HiHome className="h-5 w-5 mr-1" />
            <span className="text-gray-500">Home</span>
          </Link>
          <Link
            to="/cart"
            active={location.pathname === "/cart"}
            className="flex"
          >
            <FaOpencart className="h-5 w-5 mr-1" />
            {cartItems.length > 0 && (
              <Badge color="info" className="h-3 ">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </Badge>
            )}
            <span className="text-gray-500">Cart</span>
          </Link>
        </Navbar.Collapse>
      </div>

      <div className="flex md:order-2 mx-5">
        {userInfo ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={userInfo.name}
                className="mr-1"
                img={userInfo.profileImage}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userInfo.name}</span>
              <span className="block truncate text-sm font-medium">
                {userInfo.email}
              </span>
            </Dropdown.Header>
            <Link to="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            {userInfo.isAdmin && (
              <>
                <Link to="/admin/products">
                  <Dropdown.Item>Admin Dashboard</Dropdown.Item>
                </Link>
              </>
            )}
            <Dropdown.Divider />
            <Dropdown.Item onClick={logoutHandler}>Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login" className="flex items-center mr-3">
            <HiUserCircle className="h-5 w-6 " />{" "}
            <span className="text-gray-500">Sign In</span>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default Header;
