import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import { toMoney } from '@/utils';
import { useForm } from 'react-hook-form';
import { paymentAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoIcon from '@assets/img/logo.png';

import generatePDF, { Resolution, Margin, usePDF} from 'react-to-pdf';

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

  const options = {
    // default is `save`
    method: 'save',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.NONE,
       // default is 'A4'
       format: 'A4',
       // default is 'portrait'
       orientation: 'portrait',
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/png',
       qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
       pdf: {
          compress: true
       },
       // see https://html2canvas.hertzen.com/configuration for more options
       canvas: {
          useCORS: true
       }
    },
 };

 

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
      setPayment({
        ...payment,
        amount: data.amount,
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
        // Check if error is enabled //
        if (client.transferCodeEnabled === "YES") {
          router.push("/online/verification");
        }
        // Check if error is enabled //
        await Swal.fire({
          title: 'Transfer Completed',
          text: 'Your transfer has been completed successfully',
          icon: 'success',
          confirmButtonText: 'Done',
          allowOutsideClick: false,
        }).then((result) => {
          router.push("/online/prepayment-success");
        });
      }
      setBusy(false);
    }

  }

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
              <div className='text-4xl font-bold my-0 rounded-3xl w-[150px] mx-auto bg-gray-100 text-red-700 text-center'>
                {toMoney(Number(client?.creditBalance), client?.accountCurrency)}
              </div>
              <h4 className='mt-3'>Transfer Reference</h4>
              <div className='text-lg font-bold my-0 rounded-3xl w-[350px] px-0 mx-auto bg-gray-100 text-blue-300 text-center'>
                {thisClient._id?.toString()}
              </div>
              <h4 className='mt-2'>Sent To</h4>
              <div className='text-lg font-bold my-0 rounded-3xl w-[350px] px-0 mx-auto bg-gray-100 text-blue-300 text-center'>
                {thisClient.firstName} {thisClient.lastName}
              </div>
            </div>
            <p className='text-gray-500 text-lg absolute bottom-0 w-full right-0 text-center mx-auto'>
              Thank you for choosing us
              <hr />
              <Link href={'#'} onClick={ () => generatePDF(targetRecieptRef,{filename: 'page.pdf'}) }>print this</Link>  
            </p>
            {/* Tailwind CSS bank transfer reciept */}
          </div>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default PrepaymentIndex