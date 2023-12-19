import { Atom, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const loggedInAtom = atom<boolean>(false);

export const paymentAtom = atomWithStorage("payment", {
    targetAccount: '',
    amount: 0,
    reference: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankCode: '',
    SortCode: '',
    routingNumber: '',
    ibanNumber: '',
});