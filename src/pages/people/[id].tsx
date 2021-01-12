import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import PeopleDTO from '../../dtos/PeopleDTO';
import api from '../../services/api';

type CharacterProps = PeopleDTO;

const Character = ({ name, created }: CharacterProps): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>Star Wars DB</title>
      </Head>

      <main>
        <h2>My name is: {name}</h2>
        <h3>I Was created in: {created}</h3>
      </main>
    </div>
  );
};

export default Character;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CharacterProps> = async context => {
  const { id } = context.params;

  const safeIdNumbersRegex = /^[1-9][0-9]?[0-9]?$/;
  const isIdValid = safeIdNumbersRegex.test(String(id));

  if (!isIdValid) {
    return {
      props: undefined,
      revalidate: 60 * 60 * 1,
      notFound: true,
    };
  }

  const response = await api.get<CharacterProps>(`/people/${String(id)}`);

  return {
    props: response.data,
    revalidate: 60 * 60 * 24,
  };
};
