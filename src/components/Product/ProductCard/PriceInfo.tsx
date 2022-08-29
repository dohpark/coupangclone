import Image from "next/image";
import styled from "@emotion/styled";
import rocketFresh from "../../../../public/rocketFresh.png";

const PriceInfo: React.FC<PriceInfoProps> = ({
  salePrice,
  isEarlyDelivery,
}) => {
  const price = salePrice.toLocaleString();

  return (
    <Container>
      <SalePrice>{price}</SalePrice>
      {"원 "}
      {isEarlyDelivery && (
        <ImageWrapper>
          <Image src={rocketFresh} alt="rocketFresh" width="72" height="16" />
        </ImageWrapper>
      )}
    </Container>
  );
};

export default PriceInfo;

const Container = styled.div`
  font-size: 14px;
  color: #ae0000;
  font-weight: 400;
  display: flex;
`;

const SalePrice = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ImageWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  padding-left: 3px;
`;

interface PriceInfoProps {
  salePrice: number;
  isEarlyDelivery: boolean;
}
