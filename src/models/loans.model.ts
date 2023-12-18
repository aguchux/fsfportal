import mongoose, { Schema } from 'mongoose';
import { Loan } from '.';

const LoansSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Clients', required: true },
    amount: { type: Number, required: true, default: 0.00 },
    repayAmount: { type: Number, required: true, default: 0.00 },
    durationDays: { type: Number, required: true, default: 30 },
    rate: { type: Number, required: true, default: 5 },
    repaid: { type: Boolean, required: true, default: false },
    loanStatus: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
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



export default mongoose.models.Loans || mongoose.model<Loan>('Loans', LoansSchema);