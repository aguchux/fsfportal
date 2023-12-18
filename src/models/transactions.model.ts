import mongoose, { Schema } from 'mongoose';
import { Transaction } from '.';

const TransactionsSchema = new Schema({
    transactionType: { type: String, required: true, enum: ['Credit', 'Debit'], default: 'Credit' },
    transactionStatus: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    amount: { type: Number, required: true, default: 0.00 },
    reference: { type: String },
    details: { type: String },
    beneficiary: { type: Schema.Types.ObjectId, ref: 'Clients' },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    }
});



export default mongoose.models.Transactions || mongoose.model<Transaction>('Transactions', TransactionsSchema);