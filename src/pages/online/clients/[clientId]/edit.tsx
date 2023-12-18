import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import LoansSideBar from '@/components/online/LoansSideBar';
import { Client, Loan } from '@/models';
import { toMoney } from '@/utils';
import { useRouter } from 'next/router';
import ClientSideBar from '@/components/online/ClientSideBar';
import {useForm} from  'react-hook-form'
import { title } from 'process';

const LoansIndex = () => {

  const { client } = useAuth()
  const [loans, setLoans] = React.useState<Loan[]>([] as Loan[]);
  const [clientInfo, setClientInfo] = React.useState<Client>({} as Client);
  const [busy, setBusy] = React.useState<boolean>(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: clientInfo.title,
      gender: clientInfo.gender,
      firstName: clientInfo.firstName,
      middleName: clientInfo.middleName,
      lastName: clientInfo.lastName,
      email: clientInfo.email,
      phone: clientInfo.phone,
      address: clientInfo.address,
      city: clientInfo.city,
      state: clientInfo.state,
      zipcode: clientInfo.zipcode,
      country: clientInfo.country,
      idType: clientInfo.idType,
      idNumber: clientInfo.idNumber,
      idExpiry: clientInfo.idExpiry,
      idImageFront: clientInfo.idImageFront,
      idImageBack: clientInfo.idImageBack,
      swiftCode: clientInfo.swiftCode,
      sortCode: clientInfo.sortCode,
      routingNumber: clientInfo.routingNumber,
      accountType: clientInfo.accountType,
      accountCurrency: clientInfo.accountCurrency,
      creditBalance: clientInfo.creditBalance,
      loanBalance: clientInfo.loanBalance,
      fixedBalance: clientInfo.fixedBalance,
      createdAt: clientInfo.createdAt,
    }
  });

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


  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-3 col-sm-12'>
          {busy ? <h3>Laoding....</h3> : <ClientSideBar client={clientInfo!} />}
        </div>

        <div className='col-md-9 col-sm-12'>
          <form autoComplete='off' autoCorrect='off'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <span className='float-right -mt-4 space-x-3'>
              <Link href={'/online'} className='text-gray-500 hover:text-blue-800'>
                <i className='fa fa-credit-card'></i> Dashboard
              </Link>
              <Link href={'#'} className='text-green-700 hover:text-green-900'>
                <i className='fa fa-plus'></i>
                Add Client
              </Link>
            </span>
            <div className='text-gray-500 text-3xl border-bottom my-3'>Client: {" "}
              <strong>
                {clientInfo.firstName} {clientInfo.middleName} <strong>{clientInfo.lastName}</strong>
              </strong>
            </div>
            <div className='row'>
              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>TITLE</th>
                      <th className='px-4 py-1'>GENDER</th>
                      <th className='px-4 py-1'>FIRST NAME</th>
                      <th className='px-4 py-1'>MIDDLE NAME</th>
                      <th className='px-4 py-1'>LAST NAME</th>
                      <th className='px-4 py-1'>BIRTH DAY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("title")}/></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("gender")}/></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.firstName || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.middleName || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.lastName || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={ ""} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>EMAIL</th>
                      <th className='px-4 py-1'>MOBILE</th>
                      <th className='px-4 py-1'>ACCOUNT TYPE</th>
                      <th className='px-4 py-1'>CURRENCY</th>
                      <th className='px-4 py-1'>CREATED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.email || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.phone || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.accountType || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.accountCurrency || ""} /></td>
                      <td className='border px-4 py-1'>{clientInfo.createdAt?.toString() || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>CREDIT BALANCE</th>
                      <th className='px-4 py-1'>LOAN BALANCE</th>
                      <th className='px-4 py-1'>FIXED DEPOSIT</th>
                      <th className='px-4 py-1'>TOTAL CREDIT</th>
                      <th className='px-4 py-1'>TOTAL DEBIT</th>
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
              
              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>ADDRESS</th>
                      <th className='px-4 py-1'>CITY</th>
                      <th className='px-4 py-1'>STATE</th>
                      <th className='px-4 py-1'>POST CODE</th>
                      <th className='px-4 py-1'>COUNTRY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.address || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.city || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.state || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.zipcode || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.country || ""} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>ID.TYPE</th>
                      <th className='px-4 py-1'>ID.NUMBER</th>
                      <th className='px-4 py-1'>ID.EXPIRY</th>
                      <th className='px-4 py-1'>ID.IMAGE(FRONT)</th>
                      <th className='px-4 py-1'>ID.IMAGE(BACK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.idType || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.idNumber || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.idExpiry?.toString() || ""} /></td>
    
                      <td className='border px-4 py-1'>{clientInfo.idImageFront || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.idImageBack || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='col-12 my-2'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>SWIFT CODE</th>
                      <th className='px-4 py-1'>SORT CODE</th>
                      <th className='px-4 py-1'>ROUTING NUMBER</th>
                      <th className='px-4 py-1'>IBAN NUMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.swiftCode || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.sortCode || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={clientInfo.routingNumber || ""} /></td>
                      <td className='border px-4 py-1'><input type="text" className='textEditor' value={""} /></td>

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
                    >
                      Update Client
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

export default LoansIndex