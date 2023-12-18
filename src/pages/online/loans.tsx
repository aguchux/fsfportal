import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import LoansSideBar from '@/components/online/LoansSideBar';
import { Loan } from '@/models';
import { toMoney } from '@/utils';

const LoansIndex = () => {

  const { client } = useAuth()
  const [loans, setLoans] = React.useState<Loan[]>([] as Loan[]);

  const [busy, setBusy] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getLoans = async () => {
      setBusy(true);
      try {
        const response = await fetch('/api/loans');
        const result = await response.json();
        if (result.success) {
          setLoans(result.data);
        }
      } finally {
        setBusy(false);
      }
    } 
    getLoans();
  }, [])


  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-4 col-sm-12'>
          <LoansSideBar client={client!} />
        </div>

        <div className='col-md-8 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashboard
            </Link>
            <div className='text-gray-500 text-3xl border-bottom mb-1'>Loans</div>
            <div className='row'>
              <div className='col-12'>
                <table className='table-auto w-full mb-2'>
                  <thead>
                    <tr>
                      <th className='px-4 py-1'>Date Credited</th>
                      <th className='px-4 py-1'>Amount</th>
                      <th className='px-4 py-1'>Rate</th>
                      <th className='px-4 py-1'>Duration (Days)</th>
                      <th className='px-4 py-1'>Approved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-1'>{String(loan.createdAt)}</td>
                        <td className='border px-4 py-1'>{toMoney(loan.amount,client?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{loan.rate}%</td>
                        <td className='border px-4 py-1'>{loan.durationDays} Days</td>
                        <td className='border px-4 py-1'>{loan.loanStatus}</td>
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