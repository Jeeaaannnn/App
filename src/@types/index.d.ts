import { UserConfig } from "next-i18next";

declare global {
  interface IAuth {
    token: string;
    date: Date;
  }

  interface IUserData {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    producerId: number;
    role: string;
    status: string;
    email: string;
    cell: string;
    address: string;
    city: string;
    administrativeArea2: string;
    isProcessing?: boolean;
    password: string;
    phone: string;
    createdAt: string;
    createdBy: number;
  }
}
