import { Category } from './category';
import { Store } from './store';

export class Ledger {
  credit: number;
  debit: number;
  trans_date: Date;
  category: Category;
  store: Store;
}
