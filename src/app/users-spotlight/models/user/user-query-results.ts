import { User } from './user';

export interface UserQueryResults {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
}

export const exampleQueryResults = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };
