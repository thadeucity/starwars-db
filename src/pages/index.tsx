import React, { useCallback, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import PeopleDTO from '../dtos/PeopleDTO';
import api from '../services/api';
import PaginatedAPIResponseDTO from '../dtos/PaginatedAPIResponseDTO';
import extractQueryParams from '../utils/extractQueryParams';
import Header from '../Components/Header';
import BodyCard from '../Components/BodyCard';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';
import { Container, Content } from '../styles/pageStyles/baseStyling';
import { ListGrid } from '../styles/pageStyles/Home';

interface HomeProps {
  people: PeopleDTO[];
  pageCount: number;
}

const Home = ({ people, pageCount }: HomeProps): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [peopleList, setPeopleList] = useState<PeopleDTO[]>([]);

  const [apiIsFetching, setApiIsFetching] = useState<boolean>(false);

  const router = useRouter();

  const handlePaginationFetching = useCallback(async (pageNumber: number) => {
    setApiIsFetching(true);
    const response = await api
      .get<PaginatedAPIResponseDTO>(`/people?page=${pageNumber}`)
      .catch(() => ({ data: undefined }));

    const newPeopleList: PeopleDTO[] = response.data?.results || [];
    setPeopleList(newPeopleList);
    setApiIsFetching(false);
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`, undefined, { shallow: true });
    handlePaginationFetching(pageNumber);
  }, []);

  useEffect(() => {
    const { page } = extractQueryParams(window.location.search);

    if (!page || page === '1') {
      setCurrentPage(1);
      setPeopleList(people);
      return;
    }

    const safePageNumbersRegex = /^[1-9][0-9]?$/;
    const isPageValid = safePageNumbersRegex.test(String(page));

    const safePage = isPageValid ? parseInt(page, 10) : 1;

    setCurrentPage(safePage);
    handlePaginationFetching(safePage);
  }, [people]);

  return (
    <Container>
      <Head>
        <title>Star Wars DB</title>
      </Head>

      <Content>
        <Header />
        <BodyCard>
          <ListGrid>
            {peopleList.map(person => (
              <Card
                title={person.name}
                imageUrl={person.mass}
                linkUrl="/people/1"
                isLoading={apiIsFetching}
                key={person.url}
              />
            ))}
          </ListGrid>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </BodyCard>
      </Content>
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await api.get<PaginatedAPIResponseDTO>(`/people`);

  const people = response.data.results;
  const pageCount = Math.ceil(response.data.count / people.length);

  return {
    props: {
      people,
      pageCount,
    },
    revalidate: 60 * 60 * 1,
  };
};
