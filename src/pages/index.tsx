import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GetStaticProps } from 'next';

import api from '../services/api';

import Header from '../Components/Header';
import BodyCard from '../Components/BodyCard';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';

import SEO from '../Components/SEO';

import extractQueryParams from '../utils/extractQueryParams';
import parseCharacter from '../utils/parseCharacter';

import PaginatedAPIResponseDTO from '../dtos/PaginatedAPIResponseDTO';
import ParsedPeopleDTO from '../dtos/ParsedPeopleDTO';

import { Container, Content } from '../styles/pageStyles/baseStyling';
import { ListGrid } from '../styles/pageStyles/Home';

interface HomeProps {
  people: ParsedPeopleDTO[];
  pageCount: number;
}

const Home = ({ people, pageCount }: HomeProps): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [peopleList, setPeopleList] = useState<ParsedPeopleDTO[]>([]);

  const [apiIsFetching, setApiIsFetching] = useState<boolean>(false);

  const router = useRouter();

  const handlePaginationFetching = useCallback(async (pageNumber: number) => {
    setApiIsFetching(true);
    const response = await api
      .get<PaginatedAPIResponseDTO>(`/people?page=${pageNumber}`)
      .catch(() => ({ data: undefined }));

    const unparsedPeople: ParsedPeopleDTO[] = response.data?.results || [];
    const newPeopleList = unparsedPeople.map(parseCharacter);

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
      <SEO title="Home" image="/Star_Wars_logo.svg" />

      <Content>
        <Header />
        <BodyCard>
          <ListGrid>
            {peopleList.map(person => (
              <Card
                title={person.name}
                imageUrl={person.imageUrl}
                linkUrl={`/people/${person.id}`}
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
      <Footer />
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await api.get<PaginatedAPIResponseDTO>(`/people`);

  const unparsedPeople = response.data.results;
  const parsedPeople = unparsedPeople.map(parseCharacter);

  const pageCount = Math.ceil(response.data.count / parsedPeople.length);

  return {
    props: {
      people: parsedPeople,
      pageCount,
    },
    revalidate: 60 * 60 * 1,
  };
};
