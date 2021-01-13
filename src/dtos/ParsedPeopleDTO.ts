/* eslint camelcase: "off" */
import PeopleDTO from './PeopleDTO';

export default interface ParsedPeopleDTO extends PeopleDTO {
  id: string;
  imageUrl: string;
  homeworldId: string;
  speciesId: string;
}
