/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Pagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: any;
  totalDocs: number;
  totalPages: number;
  docs: any[];
  text:any
}
