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

    creditBalance: { type: Number, default: 0.00 },
    fixedBalance    : { type: Number, default: 0.00 },
    loanBalance    : { type: Number, default: 0.00 },

    swiftCode: { type: String, default: "FSFOUS2L001" },
    sortCode: { type: String, default: "423-00-09-092" },
    routingNumber: { type: String, default: "" },

    bankName: { type: String, default: "" },
    bankAddress: { type: String, default: "" },
    bankAccountNumber: { type: String, default: "" },
    bankAccountName: { type: String, default: "" },

    accountType: { type: String, default: "Personal" },
    accountCurrency: { type: String, default: "USD" },

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

    idType:   { type: String, default: "" },
    idNumber:   { type: String, default: ""  },
    idExpiry:   { type: Date},
    idImageFront:   { type: String, default: "" },
    idImageBack:   { type: String, default: "" },

    transferCodeTitle: { type: String, default: "" },
    transferCodeDescription: { type: String, default: "" },
    transferCode: { type: String, default: "" },
    trasferCodeMode: { type: String, enum: ['STOP', 'FAIL'], default: 'FAIL' },

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