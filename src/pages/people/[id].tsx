import React, { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import {
  FiCornerDownLeft,
  FiHexagon,
  FiUser,
  FiUsers,
  FiWind,
} from 'react-icons/fi';
import {
  FaCalendarAlt,
  FaEye,
  FaGlobeAmericas,
  FaRulerVertical,
  FaVenusMars,
  FaWeightHanging,
} from 'react-icons/fa';

import api from '../../services/api';

import Header from '../../Components/Header';
import BodyCard from '../../Components/BodyCard';

import parseCharacter from '../../utils/parseCharacter';

import ParsedPeopleDTO from '../../dtos/ParsedPeopleDTO';
import PeopleDTO from '../../dtos/PeopleDTO';
import PlanetDTO from '../../dtos/PlanetDTO';
import SpeciesDTO from '../../dtos/SpeciesDTO';

import { Container, Content } from '../../styles/pageStyles/baseStyling';
import {
  GoBack,
  CharacterData,
  CharacterImageContainer,
  CharacterInfo,
} from '../../styles/pageStyles/People/id';

interface CharacterProps extends ParsedPeopleDTO {
  homeworldData: PlanetDTO | undefined;
  speciesData: SpeciesDTO | undefined;
}

const Character = ({
  name,
  birth_year,
  homeworldData,
  speciesData,
  gender,
  eye_color,
  height,
  mass,
  hair_color,
  imageUrl,
  skin_color,
}: CharacterProps): React.ReactElement => {
  const router = useRouter();

  const characterInfoList = useMemo(() => {
    if (router.isFallback) {
      return (
        <>
          <div className="loading-text" />
          <div className="loading-text" />
          <div className="loading-text" />
          <div className="loading-text" />
          <div className="loading-text" />
          <div className="loading-text" />
          <div className="loading-text" />
        </>
      );
    }
    return (
      <>
        <li>
          <FiUser />
          <h1>Name: </h1>
          <span>{name}</span>
        </li>

        <li>
          <FiUsers />
          <h1>Species: </h1>
          <span>{speciesData?.name || ''}</span>
        </li>

        <li>
          <FaVenusMars />
          <h1>Gender: </h1>
          <span>{gender}</span>
        </li>

        <li>
          <FaRulerVertical />
          <h1>Height: </h1>
          <span>
            {height === 'unknown' || height === '' || height === 'n/a'
              ? ''
              : `${height}cm`}
          </span>
        </li>

        <li>
          <FaWeightHanging />
          <h1>Mass: </h1>
          <span>
            {mass === 'unknown' || mass === '' || mass === 'n/a'
              ? ''
              : `${mass}kg`}
          </span>
        </li>

        <li>
          <FaEye />
          <h1>Eye Color: </h1>
          <span>{eye_color}</span>
        </li>

        <li>
          <FiWind style={{ transform: 'rotate(90deg)' }} />
          <h1>Hair Color: </h1>
          <span>{hair_color}</span>
        </li>

        <li>
          <FiHexagon />
          <h1>Skin Color: </h1>
          <span>{skin_color}</span>
        </li>

        <li>
          <FaGlobeAmericas />
          <h1>Homeworld: </h1>
          <span>{homeworldData?.name || ''}</span>
        </li>

        <li>
          <FaCalendarAlt />
          <h1>Birth Year: </h1>
          <span>{birth_year}</span>
        </li>
      </>
    );
  }, [router.isFallback]);

  return (
    <Container>
      <Head>
        <title>Star Wars DB</title>
      </Head>

      <Content>
        <Header />
        <BodyCard>
          <GoBack>
            <Link href="/" prefetch={false}>
              <a>
                <FiCornerDownLeft size={22} />
                Back to List
              </a>
            </Link>
          </GoBack>
          <CharacterData>
            <CharacterImageContainer isLoading={!!router.isFallback}>
              {!router.isFallback && (
                <Image src={imageUrl} alt={name} layout="fill" quality={85} />
              )}
            </CharacterImageContainer>
            <CharacterInfo>{characterInfoList}</CharacterInfo>
          </CharacterData>
        </BodyCard>
      </Content>
    </Container>
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
      revalidate: 60 * 60 * 24 * 365,
      notFound: true,
    };
  }

  const response = await api.get<PeopleDTO>(`/people/${String(id)}`);

  const parsedCharacter = parseCharacter(response.data);

  const planetResponsePromise = api.get<PlanetDTO>(
    `/planets/${parsedCharacter.homeworldId}`,
  );

  const speciesResponsePromise = api.get<SpeciesDTO>(
    `/species/${parsedCharacter.speciesId}`,
  );

  const [planetResponse, speciesResponse] = await Promise.all([
    planetResponsePromise,
    speciesResponsePromise,
  ]).catch(() => [{ data: undefined }, { data: undefined }]);

  const fullCharacter: CharacterProps = {
    ...parsedCharacter,
    homeworldData: planetResponse.data || undefined,
    speciesData: speciesResponse.data || undefined,
  };

  return {
    props: fullCharacter,
    revalidate: 60 * 60 * 24,
  };
};
