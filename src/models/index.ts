import Clients from "./clients.model";
import Transactions from "./transactions.model";
import Loans from "./loans.model";

import mongoose, { Schema } from "mongoose";

export interface Loan extends mongoose.Document {
    _id?: Schema.Types.ObjectId;
    client: Schema.Types.ObjectId;
    amount: number;
    repayAmount: number;
    durationDays: number;
    rate: number;
    repaid: boolean;
    loanStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Transaction extends mongoose.Document {
    _id?: Schema.Types.ObjectId;
    transactionType: string;
    transactionStatus: string;

    amount: number;
    reference?: string;
    details?: string;

    beneficiary?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Client extends mongoose.Document {
    _id?: Schema.Types.ObjectId;
    isAdmin: boolean;
    accid: string;
    password?: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;

    middleName?: string;

    title?: string;
    gender?: string;
    birthDay?: string;
    profileImage?: string;
    creditBalance?: number;
    fixedBalance?: number;
    loanBalance?: number;

    accountType?: string;
    accountCurrency?: string;

    swiftCode: string;
    sortCode: string;
    routingNumber: string;
    ibanNumber?:string;
    emailNotice?: boolean;
    smsNotice?: boolean;

    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    idType?: string;
    idNumber?: string;
    idExpiry?: string;
    idImageFront?: string;
    idImageBack?: string;

    transferCodeTitle?: string;
    transferCodeDescription?: string;
    transferCode?: string;
    transferCodeMode?: string;

    disabled?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fsf_db');
        console.log("Database connected...");
        // set up client
        const countClients = await Clients.countDocuments();
        if (countClients === 1) {

        }
        if (countClients <= 0) {
            Clients.create({
                accid: "0123456789",
                password: "admin",
                isAdmin: true,
                firstName: "Banco",
                lastName: "Admin",
                email: "admin@banco.com",
                phone: "0123456789",
                accountType: "Personal",
                accountCurrency: "USD",
            });
            console.log("Admin account created...");
        }
    } catch (error) {
        console.log(error);
    }
    return {
        Clients,
        Transactions,
        Loans
    }
}

export default dbCon;