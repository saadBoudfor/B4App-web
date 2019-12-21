import {Amount} from './Amount';

export class Income {
  id?: number;
  origin?: string;
  description?: string;
  transferDate?: Date;
  amount?: Amount;
  isProgrammed?: boolean;
  endDate?: Date;
}

