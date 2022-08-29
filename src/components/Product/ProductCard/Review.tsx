import styled from "@emotion/styled";
import Star from "./Star";

const Review: React.FC<ReviewProps> = ({ reviewCount, rating }) => {
  return (
    <Container>
      <Star rating={rating} />
      <ReviewCount>({reviewCount})</ReviewCount>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 6px;
`;

const ReviewCount = styled.span`
  margin-left: 3px;
  color: #888;
  font-size: 11px;
`;

interface ReviewProps {
  reviewCount: number;
  rating: number;
}

export default Review;
