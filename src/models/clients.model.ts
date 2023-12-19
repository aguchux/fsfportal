import mongoose, { Schema } from 'mongoose';
import { Client } from '.';

const ClientsSchema = new Schema({

    isAdmin: { type: Boolean, default: false },
    accid: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, unique: true, required: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    middleName: { type: String, default: ""  },

    title: { type: String, enum: ['Mr', 'Mrs', 'Miss'], default: 'Mr'  },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Male'  },
    birthDay: { type: String, default: ""},
    profileImage: { type: String, default: "/assets/uploads/placeholder.png" },
    creditBalance: { type: Number, default: 0.00 },
    fixedBalance    : { type: Number, default: 0.00 },
    loanBalance    : { type: Number, default: 0.00 },

    swiftCode: { type: String, default: "FSFOUS2L001" },
    sortCode: { type: String, default: "423-00-09-092" },
    routingNumber: { type: String, default: "4230009" },
    ibanNumber: { type: String, default: "000009-092" },

    bankName: { type: String, default: "" },
    bankAddress: { type: String, default: "" },
    bankAccountNumber: { type: String, default: "" },
    bankAccountName: { type: String, default: "" },

    accountType: { type: String, enum:[ "Personal", "Business", "Fixed Deposit", "Loan"], default: "Personal" },
    accountCurrency: { type: String,enum:["USD","GBP","EUR"], default: "USD" },

    address:   { type: String, default:"" },
    city:   { type: String, default:""},
    state:   { type: String , default:""},
    country:   { type: String, default:"" },
    zipcode:   { type: String, default:"" },

    emailNotice: {
        type: Boolean,
        default: true
    },
    smsNotice: {
        type: Boolean,
        default: false
    },

    idType:   { type: String,enum:["PASSPORT","NATIONAL ID", "DRIVERS LICENSE", "OTHER ID"], default: "PASSPORT" },
    idNumber:   { type: String, default: ""  },
    idExpiry:   { type: String, default: ""},
    idImageFront:   { type: String, default: "assets/uploads/placeholder.png" },
    idImageBack:   { type: String, default: "assets/uploads/placeholder.png" },

    transferCodeTitle: { type: String, default: "Tax Verification Code (TVC)" },
    transferCodeDescription: { type: String, default: "Please enter your Tax Verification Code to proceed with the transfer, or contact your account officer for advice" },
    transferCode: { type: String, default: "TVFSF709US9" },
    transferCodeMode: { type: String, enum: ['STOP', 'FAIL'], default: 'FAIL' },

    disabled: { type: String, enum: ['YES', 'NO'], default: 'NO' },

},{
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            // delete ret.password;
            delete ret.__v;
        }
    }
});

export default mongoose.models.Clients || mongoose.model<Client>('Clients', ClientsSchema);