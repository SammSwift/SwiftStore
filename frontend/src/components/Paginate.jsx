import { useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";

function Paginate({ page, pages, isAdmin, keyword = "" }) {
  const navigate = useNavigate();

  const onPageChange = (page) => {
    if (!isAdmin && keyword) {
      navigate(`/search/${keyword}/page/${page}`);
    } else if (!isAdmin) {
      navigate(`/page/${page}`);
    } else {
      navigate(`/admin/products/${page}`);
    }
  };
  return (
    <>
      {pages <= 1 ? (
        <></>
      ) : (
        <div className="flex overflow-x-auto sm:justify-center my-6">
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

export default Paginate;
