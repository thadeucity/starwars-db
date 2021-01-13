import PeopleDTO from '../dtos/PeopleDTO';
import ParsedPeopleDTO from '../dtos/ParsedPeopleDTO';

const parseCharacter = (character: PeopleDTO): ParsedPeopleDTO => {
  const characterId = character.url.split('/')[5];
  const imageUrl = `/img/people/${characterId}.jpg`;

  return {
    ...character,
    id: characterId,
    imageUrl,
  };
};

export default parseCharacter;
