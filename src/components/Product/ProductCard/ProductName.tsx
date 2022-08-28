import styled from "@emotion/styled";

const ProductName: React.FC<NameProps> = ({ name }) => {
  return <Container>{name}</Container>;
};

interface NameProps {
  name: string;
}

const Container = styled.div`
  font-size: 12px;
  color: #111;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  word-wrap: break-word;
  text-decoration: none;
`;

export default ProductName;
