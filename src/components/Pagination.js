import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const { info, activePage, prevHandle, nextHandle } = useData();

  return (
    <StyledPagination>
      <Page>
        {activePage} из {info.pages}
      </Page>
      <Prev info={info} onClick={prevHandle}>
        Prev
      </Prev>
      <Next info={info} onClick={nextHandle}>
        Next
      </Next>
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.div`
  color: #fff;
`;

const Prev = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ info }) => (info?.prev ? 'color: #83bf46' : 'color: #333')};
`;

const Next = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ info }) => (info?.next ? 'color: #83bf46' : 'color: #333')};
`;
