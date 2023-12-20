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

const PrepaymentIndex = () => {
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
      accountName: '',
      accountNumber: '',
      bankName: '',
      bankCode: '',
      SortCode: '',
      routingNumber: '',
      ibanNumber: '',
    }
  });

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
      title: 'Completing Transfer',
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
      const getAFunction = await threeStateRandom();
      const getAFunctionResult = await getAFunction();
      if (getAFunctionResult) {
        // Check if error is enabled //
        if (client.transferCodeEnabled === "YES") {
          router.push("/online/verification");
          return;
        } else {
          // Check if error is enabled //
          await Swal.fire({
            title: 'Transfer Completed',
            text: 'Your transfer has been completed successfully',
            icon: 'success',
            confirmButtonText: 'Done',
            allowOutsideClick: false,
          }).then(async (result) => {
            if (result.isConfirmed) {
              // create Transfer in Database
              // create Transaction
              // update client account balance
              try {
                const response = await fetch(`/api/transfers/create?clientId=${client?._id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    ...payment,
                    verificationCode: data.verificationCode,
                  })
                });
                const result = await response.json();
                if (result.success) {
                  Swal.fire({
                    icon: 'success',
                    title: `Payment Successful`,
                    text: `Your Payment was successfully processed.`,
                    backdrop: true,
                    background: '#f6f6f6',
                    allowOutsideClick: false,
                  });
                  // Reset Payment Store//
                  setPayment({
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
                  // Reset Payment Store//
                  const { data } = result;
                  router.push(`/online/payments/${data._id!}/success`);
                  return;
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: `Payment Failed`,
                    text: `${result.message}`,
                    backdrop: true,
                    background: '#f6f6f6',
                    allowOutsideClick: false,
                  });
                  setPayment({
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
                  router.push("/online/send-money");
                  return;
                }
              } catch (error) {
                console.log(error);
              } finally {
                setBusy(false);
              }


            }
          });
        }
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

            <div className='text-gray-500 text-3xl border-bottom mb-10'>Transfer Details</div>
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
                  <label htmlFor='targetAccount' className='text-lg'>Account to Debit</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.targetAccount}</h3>
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='amount' className='text-lg'>Amount: <span className='text-gray-300'></span></label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{toMoney(Number(payment.amount), client?.accountCurrency)}</h3>
                </div>
                <div className='form-group col-md-12 col-12'>
                  <label htmlFor='reference' className='text-lg'>Reference: <span className='text-gray-300'></span></label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.reference}</h3>
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <div className='text-gray-500 text-3xl border-bottom'>Beneficiary Information</div>
                </div>
              </div>
              <div className='row'>


                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='accountName' className='text-lg'>Account Name</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.accountName}</h3>
                </div>

                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='accountNumber' className='text-lg'>Account Number</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.accountNumber}</h3>
                </div>

                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='bankName' className='text-lg'>Bank Name</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.bankName}</h3>
                </div>

                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='bankCode' className='text-lg'>Bank/Swift Code</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.bankCode}</h3>
                </div>

                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='SortCode' className='text-lg'>Sort Code</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.SortCode}</h3>
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='routingNumber' className='text-lg'>Routing Number</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.routingNumber}</h3>
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='ibanNumber' className='text-lg'>IBAN Number</label>
                  <h3 className='bg-gray-300 px-2 py-1 text-lg rounded-lg'>{payment.ibanNumber}</h3>
                </div>
                <div className='form-group col-md-8 col-12'>
                  <hr />
                  <button className='btn btn-primary'>Complete Payment</button>
                </div>

              </div>
            </form>
            {/* Tailwindcss Client Edit Profile form */}
          </div>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default PrepaymentIndex