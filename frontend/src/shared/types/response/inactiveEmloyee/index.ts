export interface InactiveEmployeeResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  tagId: string;
  status: string;
}