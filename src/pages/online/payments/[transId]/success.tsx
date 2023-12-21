import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { toMoney } from '@/utils';
import Image from 'next/image';
import logoIcon from '@assets/img/logo.png';
import { useRouter } from 'next/router';
import generatePDF, { Resolution, Margin,Options } from 'react-to-pdf';
import { Transfer } from '@/models';

const PaymentSuccessIndex = () => {

  const { client } = useAuth()
  const {query,push} = useRouter();
  const [copied, setCopied] = React.useState<boolean>(false);
  const [thisClient, setThisClient] = React.useState<OnClient>({} as OnClient);

  const [transfer, setTransfer] = React.useState<Transfer>({} as Transfer);

  const {transId} =  query;

  const options:Options = {
    filename:`${transId}.pdf`,
    method: 'open',
    resolution: Resolution.HIGH,
    page: {
       margin: Margin.NONE,
       format: 'a5',
       orientation: 'portrait',
    },
    canvas: {
       mimeType: 'image/png',
       qualityRatio: 1
    }
 };


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
  }, [client, copied])

  React.useEffect(() => { 
    const getTransfer = async()=>{
      const response = await fetch(`/api/transfers/${transId}/info`);
      const result = await response.json();
      if(!result.success){
        push('/online');
        return;
      }
      const data = result.data;
      setTransfer(data);
    }
    getTransfer();
  }, [transId])

  const targetRecieptRef = React.useRef<HTMLDivElement>(null);

  return (
    <OnlineLayout>

      <div className='row'>


        <div className='col-md-6 col-sm-12 mx-auto'>
          <div className='bg-white rounded-lg p-0 min-h-[750px] pt-[150px] shadow-lg text-center relative' ref={targetRecieptRef}>
            {/* Tailwind CSS bank transfer reciept */}
            <Image src={logoIcon} className='clear-both mt-10 h-auto mb-5 w-[40%] mx-auto' alt="Payment Successful" />
            <div className='pt-[20px] text-center'>
              <h1 className='text-3xl text-gray-700 font-bold'>Payment Successful</h1>
              <p className='text-gray-500 text-lg'>Your payment has been completed successfully</p>
              <h3>Amount</h3>
              <div className='text-4xl font-bold my-0 rounded-3xl min-w-[200px] mx-auto  text-green-700 text-center'>
                {toMoney(Number(transfer?.amount), client?.accountCurrency)}
              </div>
              <h4 className='mt-3'>Transfer Reference</h4>
              <div className='text-lg font-bold my-0 rounded-3xl w-[350px] px-0 mx-auto bg-gray-100 text-blue-300 text-center'>
                {transfer._id?.toString()}
              </div>
              <h4 className='mt-2'>Sent To</h4>
              <div className='text-lg font-bold my-0 rounded-3xl w-[350px] px-0 mx-auto bg-gray-100 text-blue-300 text-center'>
                {transfer.accountName}
              </div>
            </div>
            <p className='text-gray-500 text-lg absolute bottom-0 w-full right-0 text-center mx-auto'>
              Thank you for choosing us
              <hr />
              <Link href={'#'} onClick={ () => generatePDF(targetRecieptRef,options)}>print this</Link>  
            </p>
            {/* Tailwind CSS bank transfer reciept */}
          </div>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default PaymentSuccessIndex