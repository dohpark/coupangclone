import styled from "@emotion/styled";
import Delivery from "./Delivery";
import ImageCard from "./Image";
import Points from "./Points";
import Price from "./Price";
import ProductName from "./ProductName";
import Recommend from "./Recommend";
import Review from "./Review";

const Card: React.FC<CardProps> = ({ value }) => {
  const {
    name,
    imageUrl,
    rating,
    reviewCount,
    originalPrice,
    salePrice,
    rocketType,
    weight,
    wowPrice,
    shippinFee,
    isRecommended,
    isMdRecommended,
    isSoldout,
    maxPoint,
    expectedDeliveryDate,
    isAssured,
    isEarlyDelivery,
  } = value;

  return (
    <Container>
      <ImageCard imageUrl={imageUrl} name={name} />
      <Recommend isRecommended={isRecommended} />
      <ProductName name={name} />
      <Price
        originalPrice={originalPrice}
        salePrice={salePrice}
        weight={weight}
        wowPrice={wowPrice}
        isEarlyDelivery={isEarlyDelivery}
      />
      <Delivery
        expectedDeliveryDate={expectedDeliveryDate}
        isAssured={isAssured}
        isEarlyDelivery={isEarlyDelivery}
      />
      <Review rating={rating} reviewCount={reviewCount} />
      <Points maxPoint={maxPoint} />
    </Container>
  );
};

const Container = styled.div`
  width: 234px;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

interface CardProps {
  value: dataType;
}

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

export default Card;
