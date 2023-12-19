import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Client, Loan } from '@/models';
import { toMoney } from '@/utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import Image from 'next/image';


const FundingIndex = () => {

  const { client } = useAuth()
  const [loans, setLoans] = React.useState<Loan[]>([] as Loan[]);
  const [clientInfo, setClientInfo] = React.useState<Client>({} as Client);
  const [busy, setBusy] = React.useState<boolean>(false);


  const router = useRouter();
  const { clientId } = router.query;

  React.useEffect(() => {
    const getClient = async () => {
      setBusy(true);
      try {
        const response = await fetch(`/api/clients/view?clientId=${clientId}`);
        const result = await response.json();
        if (result.success) {
          setClientInfo(result.data);
        }
      } finally {
        setBusy(false);
      }
    }
    getClient();
  }, [clientId])


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    values: {
      fundingType: "Credit",
      fundingWallet: "Credit",
      amount: 0,
      reference: "",
    }
  });

  const theAmount = watch("amount");

  const onSubmit = async (data: any) => {
    try {
      setBusy(true);
      const response = await fetch(`/api/clients/funding?clientId=${clientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        const resp = await Swal.fire({
          title: 'Success!',
          text: 'Funding processed successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        if(resp.isConfirmed){
          router.push(`/online/clients/${clientId}/view`);          
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {

    } finally {
      setBusy(false);
    }
  }

  return (
    <OnlineLayout>
      <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <form autoComplete='off' autoCorrect='off' onSubmit={handleSubmit(onSubmit)}>
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
              <span className='float-right -mt-4 space-x-3'>
                <Link href={'/online'} className='text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> Dashboard
                </Link>
                <Link href={'/online/add-client'} className='text-green-700 hover:text-green-900'>
                  <i className='fa fa-plus'></i>
                  Add Client
                </Link>
              </span>
              <div className='text-gray-500 text-3xl border-bottom my-3'>Client: {" "}
                <strong>{clientInfo.firstName} {clientInfo.middleName} {clientInfo.lastName}</strong> ({clientInfo.accid})             
              </div>
              <div className='row'>


                <div className='col-12 my-2 bg-green-200 p-2 rounded-lg'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>CREDIT/DEBIT</th>
                        <th className='px-4 py-1'>TARGET WALLET</th>
                        <th className='px-4 py-1'>AMOUNT: <span className='text-green-700'>{ toMoney(theAmount,clientInfo.accountCurrency)}</span></th>
                        <th className='px-4 py-1'>REFERENCE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1 form-group'>
                          <select {...register("fundingType")} className='form-select textEditor form-control'>
                            <option value="Credit">Credit</option>
                            <option value="Debit">Debit</option>
                          </select>
                        </td>
                        <td className='border px-4 py-1'>
                          <select {...register("fundingWallet")} className='form-select textEditor form-control'>
                            <option value="Credit">Credit</option>
                            <option value="Loan">Loan</option>
                            <option value="Fixed">Fixed</option>
                          </select>
                        </td>
                        <td className='border px-4 py-1'>
                          <input type='number' {...register("amount")} className='form-control textEditor' />
                        </td>
                        <td className='border px-4 py-1'>
                          <input type='text' {...register("reference")} className='form-control textEditor' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='col-12 my-2'>
                  {/* Button */}
                  <div className='mt-0 text-left'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      aria-disabled={busy}
                      disabled={busy}
                    >
                      Process Funding
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default FundingIndex