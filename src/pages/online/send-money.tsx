import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import { toMoney } from '@/utils';
import AccountBalance from '@/components/online/AccountBalance';
import { useForm } from 'react-hook-form';
import { paymentAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

const SendMoneyIndex = () => {
  const { client, update } = useAuth()
  const [copied, setCopied] = React.useState<boolean>(false);
  const [thisClient, setThisClient] = React.useState<OnClient>({} as OnClient);
  const [busy, setBusy] = React.useState<boolean>(false);
  const router = useRouter();
  const [payment, setPayment] = useAtom(paymentAtom);

  const randomProcessingtime = (): number => {
    // random number between 10000 and 30000
    const random = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    return random;
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    targetAccount: string;
    amount: number;
    reference: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
    SortCode: string;
    routingNumber: string;
    ibanNumber: string;
  }>({
    values: {
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
    }
  });

  const amountToSend = watch('amount');
  const targetAccount = watch('targetAccount', "Credit");

  const getLimitBalance = (targetAccount: string): number => {
    if (targetAccount === 'Credit') return Number(client?.creditBalance);
    if (targetAccount === 'Loan') return Number(client?.loanBalance);
    if (targetAccount === 'Fixed') return Number(client?.fixedBalance);
    return 0;
  }

  React.useEffect(() => {
    if (!client || copied) return;
    setThisClient({
      _id: client._id,
      firstName: client.firstName,
      middleName: client.middleName!,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      emailNotice: client.emailNotice!,
      smsNotice: client.smsNotice!,
      address: client.address!,
      city: client.city!,
      zipcode: client.zipcode!,
      state: client.state!,
      country: client.country!,
    });
    setCopied(true);
  }, [client, copied, busy])


  const threeStateRandom = async () => {
    const connectionTimout = () => {
      const swalresult = Swal.fire({
        title: 'Connection Timed Out',
        text: 'Sorry, your connection timed out. This means it is taking longer than required to reach the beneficiary bank. Please try again',
        icon: 'error',
        confirmButtonText: 'Try Again',
        allowOutsideClick: false,
      });
      return false;
    }

    const successful1 = () => {
      return true;
    }
    const issuerInoperative = () => {
      const swalresult = Swal.fire({
        title: 'Issuer Inoperative',
        text: 'Sorry, the beneficiary bank is currently inoperative or unreachable. Please try again',
        icon: 'error',
        confirmButtonText: 'Try Again',
        allowOutsideClick: false,
      });
      return false;
    }
    const successful = () => {
      return true;
    }

    const statesFunctions = [connectionTimout, issuerInoperative, successful1, successful];
    // run a random function
    const random = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    return statesFunctions[random];
  }


  const onSubmit = async (data: any) => {
    setBusy(true);
    const start = await Swal.fire({
      title: 'Processing Payment',
      didOpen: () => {
        Swal.showLoading()
      },
      timerProgressBar: true,
      timer: randomProcessingtime(),
      backdrop: true,
      background: '#f6f6f6',
      allowOutsideClick: false,
    });
    if (start.isDismissed) {
      setPayment({
        ...payment,
        targetAccount: data.targetAccount,
        amount: data.amount,
        reference: data.reference,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        bankCode: data.bankCode,
        SortCode: data.SortCode,
        routingNumber: data.routingNumber,
        ibanNumber: data.ibanNumber,
      });
      const getAFunction = await threeStateRandom();
      const getAFunctionResult = await getAFunction();
      if (getAFunctionResult) {
        router.push("/online/prepayment");
      }
      setBusy(false);
    }

  }

  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-4 col-sm-12'>
          <AccountBalance client={client!} />
        </div>
        <div className='col-md-8 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>

            <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashbaord
            </Link>

            <div className='text-gray-500 text-3xl border-bottom mb-10'>Send Money</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-12 my-2 bg-green-200 p-2 rounded-lg'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>CREDIT</th>
                        <th className='px-4 py-1'>LOAN</th>
                        <th className='px-4 py-1'>FIXED</th>
                        <th className='px-4 py-1'>CREDIT</th>
                        <th className='px-4 py-1'>DEBIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>{toMoney(Number(client?.creditBalance), client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(client?.loanBalance), client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(client?.fixedBalance), client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(0), client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(0), client?.accountCurrency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='form-group col-md-8 col-12'>
                  <label htmlFor='targetAccount' className='text-2xl'>Account to Debit</label>
                  <select
                    name='targetAccount'
                    id='targetAccount'
                    {...register("targetAccount", { required: true })}
                    className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                  >
                    <option value=''>Select Account</option>
                    <option value='Credit'>Credit Account ({toMoney(Number(client?.creditBalance), client?.accountCurrency)})</option>
                    <option value='Loan'>Loan Account ({toMoney(Number(client?.loanBalance), client?.accountCurrency)})</option>
                    <option value='Fixed'>Fixed Account ({toMoney(Number(client?.fixedBalance), client?.accountCurrency)})</option>
                  </select>
                  {/* error */}
                  {errors.targetAccount && <span className='text-red-500 text-2xl'>Account to debit is required</span>}
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='amount' className='text-2xl'>Amount: <span className='text-gray-300'>{toMoney(Number(amountToSend), client?.accountCurrency)}</span></label>
                  <input
                    type='number'
                    name='amount'
                    id='amount'
                    {...register("amount", { required: true, min: 0, max: getLimitBalance(targetAccount) })}
                    className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                    placeholder='0'
                  />
                  {/* error */}
                  {errors.amount && <span className='text-red-500 text-2xl'>Check your balance..</span>}
                </div>
                <div className='form-group col-md-12 col-12'>
                  <label htmlFor='reference' className='text-2xl'>Transaction Reference:</label>
                  <input
                    type='text'
                    name='reference'
                    id='reference'
                    {...register("reference", { required: true })}
                    className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                    placeholder='Transfer reference'
                  />
                  {/* error */}
                  {errors.reference && <span className='text-red-500 text-2xl'>transaction reference cannot be empty..</span>}
                </div>
              
          </div>
          <div className='row'>
            <div className='form-group col-md-8 col-12'>
              <div className='text-gray-500 text-3xl border-bottom'>Beneficiary Information</div>
            </div>
          </div>
          <div className='row'>


            <div className='form-group col-md-6 col-12'>
              <label htmlFor='accountName' className='text-2xl'>Account Name</label>
              <input
                type='text'
                name='accountName'
                id='accountName'
                {...register("accountName", { required: true })}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Account Name'
              />
              {/* error */}
              {errors.accountName && <span className='text-red-500 text-2xl'>Account Name is required</span>}
            </div>

            <div className='form-group col-md-6 col-12'>
              <label htmlFor='accountNumber' className='text-2xl'>Account Number</label>
              <input
                type='text'
                name='accountNumber'
                id='accountNumber'
                {...register("accountNumber", { required: true })}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Account Number'
              />
              {/* error */}
              {errors.accountNumber && <span className='text-red-500 text-2xl'>Account Number is required</span>}
            </div>

            <div className='form-group col-md-6 col-12'>
              <label htmlFor='bankName' className='text-2xl'>Bank Name</label>
              <input
                type='text'
                name='bankName'
                id='bankName'
                {...register("bankName", { required: true })}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Bank Name'
              />
              {/* error */}
              {errors.bankName && <span className='text-red-500 text-2xl'>Bank Name is required</span>}
            </div>

            <div className='form-group col-md-6 col-12'>
              <label htmlFor='bankCode' className='text-2xl'>Bank/Swift Code</label>
              <input
                type='text'
                name='bankCode'
                id='bankCode'
                {...register("bankCode", { required: true })}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Bank Code'
              />
              {/* error */}
              {errors.bankCode && <span className='text-red-500 text-2xl'>Bank Code is required</span>}
            </div>

            <div className='form-group col-md-4 col-12'>
              <label htmlFor='SortCode' className='text-2xl'>Sort Code</label>
              <input
                type='text'
                name='SortCode'
                id='SortCode'
                {...register("SortCode", { required: true })}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Sort Code'
              />
              {/* error */}
              {errors.SortCode && <span className='text-red-500 text-2xl'>Sort Code is required</span>}
            </div>
            <div className='form-group col-md-4 col-12'>
              <label htmlFor='routingNumber' className='text-2xl'>Routing Number</label>
              <input
                type='text'
                name='routingNumber'
                id='routingNumber'
                {...register("routingNumber")}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='Routing Number'
              />
              {/* error */}
              {errors.routingNumber && <span className='text-red-500 text-2xl'>Routing Number is required</span>}
            </div>
            <div className='form-group col-md-4 col-12'>
              <label htmlFor='ibanNumber' className='text-2xl'>IBAN Number</label>
              <input
                type='text'
                name='ibanNumber'
                id='ibanNumber'
                {...register("ibanNumber")}
                className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                placeholder='IBAN Number'
              />
              {/* error */}
              {errors.ibanNumber && <span className='text-red-500 text-2xl'>IBAN Number is required</span>}
            </div>
            <div className='form-group col-md-8 col-12'>
              <hr />
              <button className='btn btn-primary'>Process Payment</button>
            </div>

          </div>
        </form>
        {/* Tailwindcss Client Edit Profile form */}
      </div>
    </div>
      </div >

    </OnlineLayout >
  )
}

export default SendMoneyIndex