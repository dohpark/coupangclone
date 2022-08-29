import styled from "@emotion/styled";
import PriceInfo from "./PriceInfo";
import SalePercentage from "./SalePercentage";
import WeightPerPrice from "./WeightPerPrice";

const Price: React.FC<PriceProps> = ({
  originalPrice,
  salePrice,
  weight,
  isEarlyDelivery,
}) => {
  const perIsValid = originalPrice - salePrice !== 0;

  return (
    <Container>
      {perIsValid && (
        <SalePercentage originalPrice={originalPrice} salePrice={salePrice} />
      )}
      <PriceInfo salePrice={salePrice} isEarlyDelivery={isEarlyDelivery} />
      {weight && <WeightPerPrice salePrice={salePrice} weight={weight} />}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 8px;
  position: relative;
`;

export default Price;

interface PriceProps {
  originalPrice: number;
  salePrice: number;
  weight: number | null;
  wowPrice: number;
  isEarlyDelivery: boolean;
}
