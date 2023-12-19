import mongoose, { Schema } from 'mongoose';
import { Transfer } from '.';

const TransfersSchema = new Schema({
    targetAccount: { type: String, required: true },
    amount: { type: Number, required: true, default: 0.00 },
    reference: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    bankName: { type: String },
    bankCode: { type: String },
    SortCode: { type: String },
    routingNumber: { type: String },
    ibanNumber: { type: String },
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



export default mongoose.models.Transfers || mongoose.model<Transfer>('Transfers', TransfersSchema);