import styled from "@emotion/styled";

const Pagination: React.FC<PaginationProps> = ({ page, valid, setPage }) => {
  const onClickPrev = () => {
    setPage(page - 1);
  };
  const onClickNext = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Button onClick={onClickPrev} disabled={!(page > 1)}>
        {"<"}
      </Button>
      <Button>{page}</Button>
      <Button onClick={onClickNext} disabled={!valid}>
        {">"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 31px;
  height: 31px;
  margin: 0 5px 0 5px;
  color: #555;
  border: 0.5px solid #e5e5e5;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #f8f8f8;
    filter: brightness(90%);
  }
`;

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  valid: boolean;
}

export default Pagination;
