export default interface CaseListItem {
  id: number;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  modifiedAt: Date;
}

export interface Case {
  id: number;
  status: string;
  type: string;
  address: string;
  administrativeArea2: string;
  city: string;
  commissionAmount: number;
  commissionPercentage: number;
  email: string;
  extinguishedAmount: number;
  from: string; //DATE
  installmentAmount: number;
  instalmentsNumber: number;
  isc: number;
  firstName: string;
  lastName: string;
  loanDescription: string;
  netAmount: string;
  phone1: string;
  phone2: string;
  resolvedAt: Date;
  createdAt: Date;
  settledAt: Date;
  modifiedAt: Date;
}
