import { Category } from './category';
import { Store } from './store';

export class Ledger {
  id: number;
  credit: number;
  debit: number;
  trans_date: string;
  category: Category;
  store: Store;
}
