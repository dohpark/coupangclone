import styled from "@emotion/styled";

const SalePercentage: React.FC<SalePercentageProps> = ({
  originalPrice,
  salePrice,
}) => {
  const getSalePercentage = (originalPrice: number, salePrice: number) =>
    Math.floor(((originalPrice - salePrice) / originalPrice) * 100);

  const salePercentage = getSalePercentage(originalPrice, salePrice);
  const price = originalPrice.toLocaleString();

  return (
    <Container>
      <Discount>{salePercentage}% </Discount>
      <OriginalPrice>{price}</OriginalPrice>
    </Container>
  );
};

const Container = styled.span`
  font-size: 12px;
`;

const Discount = styled.span`
  color: #111;
  padding-right: 2px;
`;

const OriginalPrice = styled.del`
  color: #888;
`;

export default SalePercentage;

interface SalePercentageProps {
  originalPrice: number;
  salePrice: number;
}
