import styled from "@emotion/styled";

const Header: React.FC<HeaderProps> = ({
  limit,
  setLimit,
  sorter,
  setSorter,
}) => {
  const onLimitHandler = (limit: string) => {
    setLimit(+limit);
  };
  const onSorterHandler = (sorter: string) => {
    setSorter(sorter);
  };

  return (
    <Container>
      <SortList>
        <InputRadio
          type="radio"
          id="bestAsc"
          value="bestAsc"
          checked={sorter === "bestAsc"}
          onChange={(e) => onSorterHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="bestAsc">쿠팡 랭킹순</LabelRadio>

        <InputRadio
          type="radio"
          id="salePriceAsc"
          value="salePriceAsc"
          checked={sorter === "salePriceAsc"}
          onChange={(e) => onSorterHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="salePriceAsc">낮은가격순</LabelRadio>

        <InputRadio
          type="radio"
          id="salePriceDesc"
          value="salePriceDesc"
          checked={sorter === "salePriceDesc"}
          onChange={(e) => onSorterHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="salePriceDesc">높은가격순</LabelRadio>

        <InputRadio
          type="radio"
          id="saleCountDesc"
          value="saleCountDesc"
          checked={sorter === "saleCountDesc"}
          onChange={(e) => onSorterHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="saleCountDesc">판매량순</LabelRadio>

        <InputRadio
          type="radio"
          id="latestAsc"
          value="latestAsc"
          checked={sorter === "latestAsc"}
          onChange={(e) => onSorterHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="latestAsc">최신순</LabelRadio>
      </SortList>
      <LimitSize>
        <InputRadio
          type="radio"
          id="12"
          value={12}
          checked={limit === 12}
          onChange={(e) => onLimitHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="12">12개씩 보기</LabelRadio>
        <InputRadio
          type="radio"
          id="24"
          value={24}
          checked={limit === 24}
          onChange={(e) => onLimitHandler(e.currentTarget.value)}
        />
        <LabelRadio htmlFor="24">24개씩 보기</LabelRadio>
      </LimitSize>
    </Container>
  );
};

interface HeaderProps {
  limit: number;
  sorter: string;
  setLimit: (limit: number) => void;
  setSorter: (sort: string) => void;
}

const Container = styled.div`
  width: 100%;
  height: 32px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SortList = styled.div``;

const InputRadio = styled.input`
  visibility: hidden;
  &:checked + label {
    color: #0073e9;
    font-weight: bold;
  }
`;
const LabelRadio = styled.label`
  font-size: 12px;
  color: #555;
  cursor: pointer;
`;

const LimitSize = styled.div`
  padding-right: 24px;
`;

export default Header;
