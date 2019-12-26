import {Amount} from './Amount';
import {Payment} from './Payment';

export class Income {
  id?: number;
  origin?: string;
  description?: string;
  transferDate?: Date;
  amount?: Amount;
  isProgrammed?: boolean;
  endDate?: Date;
  payment?: Payment;
}

