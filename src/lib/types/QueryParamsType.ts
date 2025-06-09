export type GetAllParamsType = {
  skip: number;
  limit: number;
  sort: string;
  sortType: 'asc' | 'desc';
  filter: Record<string, unknown>;
};