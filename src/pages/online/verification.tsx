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

const VerificationIndex = () => {
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
    verificationCode: string;
  }>({
    values: {
      verificationCode: ''
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



  const onSubmit = async (data: any) => {
    setBusy(true);
    const start = await Swal.fire({
      title: `'Verifying: ${client?.transferCodeTitle}'`,
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
      // Check if error is enabled //
      if (data.verificationCode === client.transferCode) {
        Swal.fire({
          icon: 'success',
          title: `Verified`,
          text: `Payment Successful`,
          backdrop: true,
          background: '#f6f6f6',
          allowOutsideClick: false,
        });
        router.push("/online");
      }else{
        Swal.fire({
          icon: 'error',
          title: `Invalid ${client.transferCodeTitle}`,
          text: `Verification Failed, your Payment cannot go through without a valid ${client.transferCodeTitle}.`,
          backdrop: true,
          background: '#f6f6f6',
          allowOutsideClick: false,
        });
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
          <div className='bg-transparent rounded-lg p-4 min-h-[138px]'>

            {/* <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashbaord
            </Link> */}

            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                {/* <div className='col-12 my-2 bg-green-200 p-2 rounded-lg'>
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
                </div> */}
                <div className='form-group col-md-12 col-12 text-center mt-10'>
                  <label htmlFor='targetAccount' className='text-4xl'>{client?.transferCodeTitle}</label>
                  <div className='bg-green-100 rounded-3xl text-2xl text-[#363636] my-3 p-4 w-[70%] mx-auto'>
                    {client?.transferCodeDescription}
                    <hr />
                    <div className='form-group col-md-12 col-12 my-3'>
                      <label htmlFor='reference' className='text-2xl'>{client?.transferCodeTitle}</label>
                      <input
                        type='text'
                        name='reference'
                        id='reference'
                        {...register("verificationCode", { required: true })}
                        className='rounded text-center w-full px-2 py-1 border-gray-500 bg-gray-100 text-black text-lg h-[55px]'
                        placeholder={client?.transferCodeTitle}
                      />
                      {/* error */}
                      {errors.verificationCode && <span className='text-red-500 text-2xl'>Enter Code</span>}
                    </div>
                    <div className='form-group col-md-12 col-12 text-center'>
                      <button className='btn btn-primary'>Process Payment</button>
                    </div>

                  </div>
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

export default VerificationIndex