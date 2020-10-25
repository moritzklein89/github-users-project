import { User } from './user';

export interface UserQueryResults {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
}
