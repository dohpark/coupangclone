import { useEffect, useState } from "react";
import Header from "./ProductHeader/Header";
import Pagination from "../Pagination/Pagination";

const Product = () => {
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState((page - 1) * limit);
  const [sorter, setSorter] = useState("bestAsc");
  const [data, setData] = useState([]);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [limit, page]);

  useEffect(() => {
    const result = fetchData(offset, limit, sorter);
    setData(result);
  }, [offset, limit, sorter]);

  return (
    <>
      <Header
        setLimit={setLimit}
        setSorter={setSorter}
        limit={limit}
        sorter={sorter}
      />
      <Pagination />
    </>
  );
};

function fetchData(offset: number, limit: number, sorter: string) {
  return [];
}

export default Product;
