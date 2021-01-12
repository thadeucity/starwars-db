import PeopleDTO from './PeopleDTO';

export default interface PaginatedAPIResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PeopleDTO[];
}
