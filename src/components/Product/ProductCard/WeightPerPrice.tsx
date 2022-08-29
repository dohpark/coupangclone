import styled from "@emotion/styled";

const WeightPerPrice: React.FC<WeightPerPriceProps> = ({
  salePrice,
  weight,
}) => {
  const getWeightPerPrice = (salePrice: number, weight: number) => {
    return Math.floor((salePrice / weight) * 100);
  };

  const weightPerPrice = getWeightPerPrice(salePrice, weight);
  const price = weightPerPrice.toLocaleString();

  return <Container>(100g당 {price}원)</Container>;
};

export default WeightPerPrice;

const Container = styled.div`
  font-size: 11px;
  color: #ae0000;
`;

interface WeightPerPriceProps {
  salePrice: number;
  weight: number;
}
