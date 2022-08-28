import { useEffect, useState } from "react";
import Header from "./ProductHeader/Header";
import Pagination from "../Pagination/Pagination";
import Card from "./ProductCard/Card";
import axios from "axios";
import styled from "@emotion/styled";

const Product = () => {
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState((page - 1) * limit);
  const [sorter, setSorter] = useState("bestAsc");
  const [data, setData] = useState<dataType[]>([]);

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
      <Grid>
        {data.map((value) => (
          <Card key={value.id} value={value} />
        ))}
      </Grid>
      <Pagination page={page} valid={data.length === limit} setPage={setPage} />
    </>
  );
};

const Grid = styled.div`
  display: grid;
`;

interface dataType {
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  salePrice: number;
  id: number;
  rocketType: string | null;
  weight: number | null;
  wowPrice: number;
  shippinFee: number;
  isRecommended: boolean;
  isMdRecommended: boolean;
  isSoldout: boolean;
  maxPoint: number;
  expectedDeliveryDate: string;
  isAssured: boolean;
  isEarlyDelivery: boolean;
}

export default Product;
