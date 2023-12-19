import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import ProfileSideBar from '@/components/online/ProfileSideBar';
import { toMoney } from '@/utils';
import LoansSideBar from '@/components/online/LoansSideBar';
import AccountBalance from '@/components/online/AccountBalance';


const SendMoneyIndex = () => {
  const { client, update } = useAuth()
  const [copied, setCopied] = React.useState<boolean>(false);
  const [thisClient, setThisClient] = React.useState<OnClient>({} as OnClient);
  const [busy, setBusy] = React.useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBusy(true);
    e.preventDefault();
    setBusy(false);
    // update client
    const updated = await update(thisClient);
    setBusy(false);
    if (updated.success) {
      Swal.fire(
        'Success',
        'Profile updated successfully',
        'success'
      )
    } else {
      Swal.fire(
        'Error',
        'Error updating profile',
        'error'
      )
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
            <form onSubmit={handleSubmit}>
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
                    className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                  >
                    <option value=''>Select Account</option>
                    <option value='Credit'>Credit Account ({toMoney(Number(client?.creditBalance), client?.accountCurrency)})</option>
                    <option value='Loan'>Loan Account ({toMoney(Number(client?.loanBalance), client?.accountCurrency)})</option>
                    <option value='Fixed'>Fixed Account ({toMoney(Number(client?.fixedBalance), client?.accountCurrency)})</option>
                  </select>
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='amount' className='text-2xl'>Amount</label>
                  <input
                    type='number'
                    name='amount'
                    id='amount'
                    className='rounded w-full px-2 py-1 border-gray-200 bg-gray-100 text-black text-2xl h-[55px]'
                    placeholder='0'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <div className='text-gray-500 text-3xl border-bottom mb-10'>Beneficiary Information</div>
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <button className='btn btn-primary'>Process Payment</button>
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

export default SendMoneyIndex