import styled from "@emotion/styled";

const Delivery: React.FC<DeliveryProps> = ({
  expectedDeliveryDate,
  isAssured,
  isEarlyDelivery,
}) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const deliveryDate = new Date(expectedDeliveryDate);
  const day = days[deliveryDate.getDay()];
  const date = deliveryDate.getDate();
  const month = deliveryDate.getMonth() + 1;

  return (
    <>
      {isEarlyDelivery ? (
        <EarlyDelivery>내일({day}) 새벽 도착 보장</EarlyDelivery>
      ) : (
        <NotEarlyDelivery>
          {day}요일 {month}/{date} 도착 예정
        </NotEarlyDelivery>
      )}
    </>
  );
};

const EarlyDelivery = styled.div`
  color: #00891a;
  font-size: 14px;
  padding-top: 3px;
`;

const NotEarlyDelivery = styled.div`
  font-size: 14px;
  padding-top: 3px;
`;

interface DeliveryProps {
  expectedDeliveryDate: string;
  isAssured: boolean;
  isEarlyDelivery: boolean;
}

export default Delivery;
