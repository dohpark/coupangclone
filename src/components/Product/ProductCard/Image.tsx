import styled from "@emotion/styled";

const Image: React.FC<CardProps> = ({ imageUrl, name }) => {
  return (
    <Container>
      <ImageBox src={imageUrl} alt={name} />
    </Container>
  );
};

interface CardProps {
  imageUrl: string;
  name: string;
}

const Container = styled.div`
  overflow: hidden;
  border-radius: 3px;
`;

const ImageBox = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export default Image;
