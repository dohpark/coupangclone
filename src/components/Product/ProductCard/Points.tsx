import styled from "@emotion/styled";
import Image from "next/image";
import cashIcon from "../../../../public/cashIcon.png";

const Points: React.FC<PointsProps> = ({ maxPoint }) => {
  const points = maxPoint.toLocaleString();

  return (
    <Container>
      <RewardBadge>
        <ImageWrapper>
          <Image src={cashIcon} alt="cashIcon" width={14} height={14} />
          <RewardCashTxt>최대 {points}원 적집</RewardCashTxt>
        </ImageWrapper>
      </RewardBadge>
    </Container>
  );
};

interface PointsProps {
  maxPoint: number;
}

const Container = styled.div`
  padding-top: 12px;
`;

const ImageWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RewardBadge = styled.div`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 10px;
  border: solid 1px #ccc;
  background-color: #fff;
`;

const RewardCashTxt = styled.span`
  color: #333;
  font-size: 12px;
  height: 14px;
  padding-left: 2px;
`;

export default Points;
