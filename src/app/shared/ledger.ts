import { Category } from './category';
import { Store } from './store';
import { PaymentType } from '../shared/paymenttype';

export class Ledger {
  id: number;
  credit: number;
  debit: number;
  trans_date: Date;
  category: Category;
  store: Store;
  payment_type: PaymentType
}
