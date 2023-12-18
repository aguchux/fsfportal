import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { toMoney } from '@/utils';
import { Transaction } from '@/models';

const OnlineIndex = () => {
  const { client } = useAuth()
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
        <div className='col-md-4 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-send'></i> Send Money
            </Link>
            <div className='text-gray-500'>Account Number</div>
            <div className='text-4xl font-bold text-green-800'>{client?.accid}</div>
            <span className='m-0 p-0 text-gray-400'><strong>IBAN: </strong>454-0044-303</span>
          </div>
        </div>
        <div className='col-md-4 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online/profile'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-user'></i> Edit Profile
            </Link>
            <div className='text-gray-500'>Account Name</div>
            <div className='text-4xl font-bold'>
              <span>{client?.lastName}</span> <span>{client?.firstName}</span>
            </div>
            <span className='m-0 p-0 text-gray-400'><strong>Account Type: </strong>{client?.accountType} ({client?.accountCurrency})</span>
          </div>
        </div>
        <div className='col-md-4 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online/transactions'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Tansactions
            </Link>
            <div className='text-gray-500'>Account Balance</div>
            <div className='text-4xl font-bold text-green-700'>{toMoney(Number(client?.creditBalance), client?.accountCurrency)}</div>
            <span className='m-0 p-0 text-gray-400'><strong>Total Spent: </strong>{toMoney(Number(0), client?.accountCurrency)}</span>
          </div>
        </div>
      </div>

      <div className='row my-4'>

        <div className='col-md-4 col-sm-12'>
          <div className='bg-white rounded-lg p-4 h-[300px] shadow-lg'>
            <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-exchange'></i> Exchange
            </Link>
            <div className='text-2xl text-gray-500'>Currency Exchages</div>
          </div>
        </div>

        <div className='col-md-8 col-sm-12'>

          <div className="row">

            <div className='col-md-6 col-sm-12'>
              <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
                <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> Move Funds
                </Link>
                <div className='text-gray-500'>Loan Account</div>
                <div className='text-4xl font-bold text-red-700'>{toMoney(Number(client?.loanBalance), client?.accountCurrency)}</div>
                <span className='m-0 p-0 text-gray-400'><strong>Interest: </strong>{toMoney(Number(0), client?.accountCurrency)}</span>
              </div>
            </div>

            <div className='col-md-6 col-sm-12'>
              <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
                <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> Adjust Policy
                </Link>

                <div className='text-gray-500'>Fixed Deposits</div>
                <div className='text-4xl font-bold text-green-700'>{toMoney(Number(client?.fixedBalance), client?.accountCurrency)}</div>
                <span className='m-0 p-0 text-gray-400'><strong>Dividend: </strong>{toMoney(Number(0), client?.accountCurrency)}</span>
              </div>
            </div>

            
            <div className='col-md-12 col-sm-12 mt-4'>
              <div className='bg-white rounded-lg p-4 min-h-[150px] shadow-lg'>
                <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> All Tansactions
                </Link>
                <div className='text-gray-500 text-2xl'>Recent Transactions<hr className='my-1 p-0'/></div>
                {/* Tailwincss Table */}
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>Date</th>
                      <th className='px-4 py-1'>Reference</th>
                      <th className='px-4 py-1'>Amount</th>
                      <th className='px-4 py-1'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-1'>{String(transaction.createdAt)}</td>
                        <td className='border px-4 py-1'>{transaction.reference}</td>
                        <td className='border px-4 py-1'>{toMoney(transaction.amount,client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{transaction.transactionStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                {/* Tailwincss Table */}
                <Link href={'#'} className='text-left clear-both mt-0 text-gray-500 hover:text-blue-800'>
                  All Tansactions
                </Link>
              </div>
            </div>


          </div>
        </div>

      </div>

    </OnlineLayout>
  )
}

export default OnlineIndex