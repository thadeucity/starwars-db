import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import PeopleDTO from '../dtos/PeopleDTO';
import api from '../services/api';
import PaginatedAPIResponseDTO from '../dtos/PaginatedAPIResponseDTO';
import extractQueryParams from '../utils/extractQueryParams';

interface HomeProps {
  people: PeopleDTO[];
  pageCount: number;
}

const Home = ({ people, pageCount }: HomeProps): React.ReactElement => {
  const [peopleList, setPeopleList] = useState<PeopleDTO[]>([]);

  useEffect(() => {
    const { page } = extractQueryParams(window.location.search);

    if (!page || page === '1') {
      setPeopleList(people);
      return;
    }

    const safePageNumbersRegex = /^[1-9][0-9]?$/;
    const isPageValid = safePageNumbersRegex.test(String(page));

    const safePage = isPageValid ? page : '1';

    api
      .get<PaginatedAPIResponseDTO>(`/people?page=${safePage}`)
      .then(res => setPeopleList(res.data.results))
      .catch(() => setPeopleList([]));
  }, [people]);

  return (
    <div>
      <Head>
        <title>Star Wars DB</title>
      </Head>

      <main>
        <h2>HEY I LOADED</h2>
        {peopleList.map(person => (
          <h1 key={person.url}>{person.name}</h1>
        ))}
      </main>
    </div>
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
