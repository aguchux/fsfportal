import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import LoansSideBar from '@/components/online/LoansSideBar';
import { Client, Loan } from '@/models';
import { toMoney } from '@/utils';

const LoansIndex = () => {

  const { client } = useAuth()
  const [loans, setLoans] = React.useState<Loan[]>([] as Loan[]);
  const [clients, setClients] = React.useState<Client[]>([] as Client[]);
  const [busy, setBusy] = React.useState<boolean>(false);

  React.useEffect(() => {

    const getClients = async () => {
      setBusy(true);
      try {
        const response = await fetch('/api/clients');
        const result = await response.json();
        if (result.success) {
          setClients(result.data);
        }
      } finally {
        setBusy(false);
      }
    }
    getClients();
  }, [])


  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-2 col-sm-12'>
          <div className='bg-white text-center rounded-lg p-4 min-h-[138px] shadow-lg'>
            <div className='text-gray-500 text-2xl'>Total Accounts</div>
            <div className='text-4xl font-bold text-gray-700'>{clients.length || 0}</div>
            <span className='m-0 p-0 text-gray-400'><strong>---</strong></span>
          </div>
        </div>

        <div className='col-md-10 col-sm-12'>
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
            <div className='text-gray-500 text-3xl border-bottom mb-3'>All Accounts & Clients</div>
            <div className='row'>
              <div className='col-12'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>ACC/NO</th>
                      <th className='px-4 py-1'>NAME</th>
                      <th className='px-4 py-1'>CONTACT</th>
                      <th className='px-4 py-1'>CREDIT</th>
                      <th className='px-4 py-1'>LOAN</th>
                      <th className='px-4 py-1'>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-1'>{String(client.accid)}</td>
                        <td className='border px-4 py-1'>
                          <div>{client.firstName} {client.middleName} <strong>{client.lastName}</strong></div>
                          <div>{client.address}</div>
                        </td>
                        <td className='border px-4 py-1'>
                          <div>{client.email}</div>
                          <div>{client.phone}</div>
                        </td>
                        <td className='border px-4 py-1'>{toMoney(client.creditBalance!, client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(client.loanBalance!, client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>
                          <div className='flex flex-row space-x-2 justify-items-stretch'>
                            <Link href={`/online/clients/${client._id}/view`} className='text-gray-500 hover:text-white'>
                              <i className='fa fa-eye'></i> View
                            </Link>
                            <Link href={`/online/clients/${client._id}/edit`} className='text-green-500 hover:text-white'>
                              <i className='fa fa-edit'></i> Edit
                            </Link>
                            <Link href={`/online/clients/${client._id}/delete`} className='text-red-500 hover:text-white'>
                              <i className='fa fa-trash'></i> Delete
                            </Link>

                          </div>
                        </td>
                      </tr>
                    ))}
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