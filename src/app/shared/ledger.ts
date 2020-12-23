import { Category } from './category';
import { Store } from './store';

export class Ledger {
  id: number;
  credit: number;
  debit: number;
  trans_date: Date;
  category: Category;
  store: Store;
  payment_type_id: number;
}
