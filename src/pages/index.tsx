import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import api from '../services/api';

import Header from '../Components/Header';
import BodyCard from '../Components/BodyCard';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';

import parseCharacter from '../utils/parseCharacter';

import PaginatedAPIResponseDTO from '../dtos/PaginatedAPIResponseDTO';
import ParsedPeopleDTO from '../dtos/ParsedPeopleDTO';

import { Container, Content } from '../styles/pageStyles/baseStyling';
import { ListGrid } from '../styles/pageStyles/Home';

interface HomeProps {
  people: ParsedPeopleDTO[];
  pageCount: number;
  currentPage: number;
}

const Home = ({
  people,
  pageCount,
  currentPage,
}: HomeProps): React.ReactElement => {
  const [apiIsFetching, setApiIsFetching] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(currentPage);
  const router = useRouter();

  const handlePageChange = useCallback((pageNumber: number) => {
    setApiIsFetching(true);
    setSelectedPage(pageNumber);
    router.push(`?page=${pageNumber}`);
  }, []);

  useEffect(() => {
    setApiIsFetching(false);
  }, [currentPage, people]);

  return (
    <Container>
      <Head>
        <title>Star Wars DB</title>
      </Head>

      <Content>
        <Header />
        <BodyCard>
          <ListGrid>
            {people.map(person => (
              <Card
                title={person.name}
                imageUrl={person.imageUrl}
                linkUrl={`/people/${person.id}`}
                key={person.url}
                isLoading={apiIsFetching}
              />
            ))}
          </ListGrid>
          <Pagination
            currentPage={selectedPage}
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async ctx => {
  const { page } = ctx.query;

  const safePageNumbersRegex = /^[1-9][0-9]?$/;
  const isPageValid = safePageNumbersRegex.test(String(page));

  const safePage = isPageValid ? parseInt(String(page), 10) : 1;

  const response = await api.get<PaginatedAPIResponseDTO>(
    `/people?page=${safePage}`,
  );

  const unparsedPeople = response.data.results;
  const parsedPeople = unparsedPeople.map(parseCharacter);

  const pageCount = Math.ceil(response.data.count / 10);

  return {
    props: {
      people: parsedPeople,
      currentPage: safePage,
      pageCount,
    },
  };
};
