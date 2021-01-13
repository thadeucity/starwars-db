import PeopleDTO from '../dtos/PeopleDTO';
import ParsedPeopleDTO from '../dtos/ParsedPeopleDTO';

const extractIdFromApiUrl = (url: string): string => {
  return url.split('/')[5];
};

const parseCharacter = (character: PeopleDTO): ParsedPeopleDTO => {
  const characterId = extractIdFromApiUrl(character.url);
  const imageUrl = `/img/people/${characterId}.jpg`;

  const homeworldId = extractIdFromApiUrl(character.homeworld);
  const speciesIds = character.species.map(extractIdFromApiUrl);

  return {
    ...character,
    id: characterId,
    imageUrl,
    homeworldId,
    speciesId: speciesIds[0] || '1',
  };
};

export default parseCharacter;
