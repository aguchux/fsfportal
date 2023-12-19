import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Transaction } from '@/models';
import { toMoney } from '@/utils';
import TransactionsSideBar from '@/components/online/TransactionsSideBar';

const AllTransactionsIndex = () => {

  const { client, update } = useAuth()
  const [transactions, setTransactions] = React.useState<Transaction[]>([] as Transaction[]);

  const [busy, setBusy] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const result = await response.json();
        if (result.success) {
          setTransactions(result.data);
        }
      } finally {
        setBusy(false);
      }
    }
    getTransactions();
  }, [])


  return (
    <OnlineLayout>

      <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashboard
            </Link>
            <div className='text-gray-500 text-3xl border-bottom mb-1'>Transactions</div>
            <div className='row'>
              <div className='col-12'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                    <th className='px-4 py-1'>Date</th>
                    <th className='px-4 py-1'>Transaction ID</th>
                      <th className='px-4 py-1'>Reference</th>
                      <th className='px-4 py-1'>Amount</th>
                      <th className='px-4 py-1'>Status</th>
                      <th className='px-4 py-1'>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-1'>{String(transaction.createdAt)}</td>
                        <td className='border px-4 py-1 uppercase text-uppercase'>{transaction._id.toString()}</td>
                        <td className='border px-4 py-1'>{transaction.reference}</td>
                        <td className='border px-4 py-1'>{toMoney(transaction.amount,client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{transaction.transactionStatus}</td>
                        <td className='border px-4 py-1'>
                          <Link href={`#`}>
                            <a className='text-green-600'>View</a>
                          </Link>
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

export default AllTransactionsIndex