import { useEffect, useState } from "react";
import Header from "./ProductHeader/Header";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

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
    const getData = async () => {
      const posts = await axios.get(
        `https://coupang.numble.it/api/products?offset=${offset}&limit=${limit}&sorter=${sorter}`
      );
      setData(posts.data);
    };

    getData();
  }, [offset, limit, sorter]);

  console.log(data);

  return (
    <>
      <Header
        setLimit={setLimit}
        setSorter={setSorter}
        limit={limit}
        sorter={sorter}
      />
      <Pagination page={page} valid={data.length === limit} setPage={setPage} />
    </>
  );
};

export default Product;
