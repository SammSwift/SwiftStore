import {
  HiOutlineCollection,
  HiOutlineUsers,
  HiViewList,
} from "react-icons/hi";
import { FaTableList, FaSquarePlus } from "react-icons/fa6";

import "../assets/style.css";

import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
  const location = useLocation();
  return (
    <div className="flex justify-center gap-7 font-serif mt-5">
      <Link
        to="/admin/summary"
        className={`flex items-center ${
          location.pathname === "/admin/summary" ? "active-link" : ""
        }`}
      >
        <FaTableList className="mr-1" />
        <h2 className="tracking-tight text-gray-500"> Summary</h2>
      </Link>
      <Link
        to="/admin/users"
        className={`flex items-center ${
          location.pathname === "/admin/users" ? "active-link" : ""
        }`}
      >
        <HiOutlineUsers className="mr-1" />
        <h2 className="tracking-tight text-gray-500"> ManageUsers</h2>
      </Link>
      <Link
        to="/admin/createproducts"
        className={`flex items-center ${
          location.pathname === "/admin/createproducts" ? "active-link" : ""
        }`}
      >
        <FaSquarePlus className="mr-1" />
        <h2 className="tracking-tight text-gray-500"> AddProducts</h2>
      </Link>
      <Link
        to="/admin/products"
        className={`flex items-center ${
          location.pathname === "/admin/products" ? "active-link" : ""
        }`}
      >
        <HiOutlineCollection className="mr-1" />
        <h2 className="tracking-tight text-gray-500"> ManageProducts</h2>
      </Link>
      <Link
        to="/admin/orderlist"
        className={`flex items-center ${
          location.pathname === "/admin/orderlist" ? "active-link" : ""
        }`}
      >
        <HiViewList className="mr-1" />
        <h2 className="tracking-tight text-gray-500"> ManageOrders</h2>
      </Link>
    </div>
  );
};

export default AdminNav;
