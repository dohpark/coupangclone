import axios from "axios";
import { useQuery } from "react-query";
import Product from "../src/components/Product/Product";

export default function ProductListPage() {
  // const { data } = useQuery("products", () =>
  //   axios.get(
  //     process.env.NEXT_PUBLIC_API_HOST +
  //       "/products?offset=0&limit=20&sorter=bestAsc"
  //   )
  // );

  // console.log(data);

  return <Product />;
}
