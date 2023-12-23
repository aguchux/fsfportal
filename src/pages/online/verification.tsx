import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
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
    // check if prepayment is stored in memory //
    if (payment.targetAccount === '' || payment.amount === 0) {
      router.push("/online/send-money");
      return;
    }
    // check if prepayment is stored in memory //
  }, [client, copied, busy,payment])

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
          if(result.success){
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
              bankAddress: '',
              routingNumber: '',
              ibanNumber: '',
            });
            // Reset Payment Store//
            const {data} = result;
            router.push(`/online/payments/${data._id!}/success`);
            return;
          } else{
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
              bankAddress: '',
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
      } else{
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
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
          </div>
        </div>
      </div>
    </OnlineLayout>
  )
}

export default VerificationIndex