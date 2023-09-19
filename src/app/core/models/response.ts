/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiResponse {
  status: string | undefined;
  message: string | undefined;
  data: any;
  docs: any;
  totalDocs: number | undefined;
  limit: number | undefined;
  page: number | undefined;
}
