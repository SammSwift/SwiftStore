import { Table, Button } from "flowbite-react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../components/AdminNav";
import ModalPopup from "../components/ModalPopup";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");

  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setProductId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = async (id) => {
    handleCloseModal();
    // Handle confirmation logic
    try {
      await deleteProduct(id);
      refetch();
      toast.success("Product Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <>
      <AdminNav />
      <h1 className="text-center font-bold text-2xl tracking-tight mt-10 mb-3">
        Manage Products
      </h1>

      <div className="flex justify-center ">
        {isLoading ? (
          <Loader msg={"Retrieving all products..."} />
        ) : error ? (
          <Message color="failure">{error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Brand</Table.HeadCell>
                <Table.HeadCell>InStock</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y"></Table.Body>
              {data.products.map((product) => (
                <Table.Row key={product._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {product._id}
                  </Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell className="font-bold">
                    ${product.price}
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.brand}</Table.Cell>
                  <Table.Cell>
                    {product.countInStock >= 1 ? (
                      <span className="rounded bg-cyan-100 px-1 text-xs font-semibold text-cyan-800">
                        In Stock
                      </span>
                    ) : (
                      <span className="rounded bg-gray-200 px-1 text-xs font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="flex gap-3">
                    <Link to={`/admin/updateproduct/${product._id}`}>
                      <Button color="light" size="sm">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      color="light"
                      size="sm"
                      onClick={() => handleOpenModal(product._id)}
                    >
                      <FaTrash />
                    </Button>
                    <Link to={`/products/${product._id}`}>
                      <Button color="light" size="sm">
                        <FaEye />
                      </Button>
                    </Link>
                    {openModal && (
                      <ModalPopup
                        isOpen={openModal}
                        onClose={handleCloseModal}
                        onCancel={handleCancel}
                        onConfirm={() => handleConfirm(productId)}
                        message="Are you sure you want to delete this product?"
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
            <Paginate page={data.page} pages={data.pages} isAdmin={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
