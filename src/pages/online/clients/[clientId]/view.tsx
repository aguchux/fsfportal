import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import LoansSideBar from '@/components/online/LoansSideBar';
import { Client, Loan } from '@/models';
import { toMoney } from '@/utils';
import { useRouter } from 'next/router';
import ClientSideBar from '@/components/online/ClientSideBar';

const LoansIndex = () => {

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


  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-3 col-sm-12'>
          {busy ? <h3>Laoding....</h3> : <ClientSideBar client={clientInfo!} />}
        </div>

        <div className='col-md-9 col-sm-12'>
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
                      <td className='border px-4 py-1'>{"Mr"}</td>
                      <td className='border px-4 py-1'>{"Male"}</td>
                      <td className='border px-4 py-1'>{clientInfo.firstName || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.middleName || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.lastName || ""}</td>
                      <td className='border px-4 py-1'>{"06-06-1980"}</td>
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
                      <td className='border px-4 py-1'>{clientInfo.email || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.phone || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.accountType || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.accountCurrency || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.createdAt?.toString()}</td>
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
                      <td className='border px-4 py-1'>{clientInfo.address || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.city || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.state || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.zipcode || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.country || ""}</td>
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
                      <td className='border px-4 py-1'>{clientInfo.idType || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.idNumber || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.idExpiry?.toString() || ""}</td>
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
                      <td className='border px-4 py-1'>{clientInfo.swiftCode || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.sortCode || ""}</td>
                      <td className='border px-4 py-1'>{clientInfo.routingNumber || ""}</td>
                      <td className='border px-4 py-1'>{""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
            </div>
          </div>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default LoansIndex