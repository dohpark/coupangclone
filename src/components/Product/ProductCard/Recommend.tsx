import Image from "next/image";
import styled from "@emotion/styled";
import coupangRecommended from "../../../../public/coupangRecommend.png";

const Recommend: React.FC<RecommendProps> = ({ isRecommended }) => {
  return (
    <Container>
      {isRecommended && (
        <Image
          src={coupangRecommended}
          alt="coupangRecommend"
          width="68"
          height="20"
        />
      )}
    </Container>
  );
};

interface RecommendProps {
  isRecommended: boolean;
}

const Container = styled.div`
  padding: 10px 0 10px;
  height: 17px;
  line-height: 16px;
`;

export default Recommend;
