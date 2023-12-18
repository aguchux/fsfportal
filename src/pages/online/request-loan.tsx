import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import LoansSideBar from '@/components/online/LoansSideBar';
import { useRouter } from 'next/router';

const ProfileIndex = () => {
  const { client, update } = useAuth()  
  const [loan, setLoan] = React.useState<{
    amount:number,
    rate:number,
  }>({
    amount: 1000,
    rate: 35,
  });

  const router = useRouter();
  const [busy, setBusy] = React.useState<boolean>(false);

  // Loan rate calculator
  const calculateLoanRate = (e:React.ChangeEvent<HTMLInputElement>, amount:number ) => {
    // 1000 to 5000 = 35%
    // 5001 to 10000 = 30%
    // 10001 to 50000 = 25%
    // 50001 to 100000 = 20%
    // 100001 to 500000 = 15%
    // 500001 to 1000000 = 10%
    // 1000001 to 5000000 = 5%
    // 5000001 to 10000000 = 2.5%
    let loanRate = 0;
    if (amount >= 1000 && amount <= 5000) {
      loanRate = 25;
    } else if (amount >= 5001 && amount <= 10000) {
      loanRate = 20;
    } else if (amount >= 10001 && amount <= 50000) {
      loanRate = 15;
    } else if (amount >= 50001 && amount <= 100000) {
      loanRate = 10;
    } else if (amount >= 100001 && amount <= 500000) {
      loanRate = 5;
    } else if (amount >= 500001 && amount <= 1000000) {
      loanRate = 2.5;
    } else if (amount >= 1000001 && amount <= 5000000) {
      loanRate = 2;
    } else if (amount >= 5000001 && amount <= 10000000) {
      loanRate = 2.5;
    }
    setLoan({
      ...loan,
      amount: amount,
      rate: loanRate,
    });
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setBusy(true);
    e.preventDefault();
    // update password
    const result = await fetch(`/api/loans/request`,{
      method: 'POST',
      body: JSON.stringify(loan),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    
    const data = await result.json();
  
    setBusy(false);
    if( data.success ) {
      Swal.fire(
        'Success',
        'Profile updated successfully',
        'success'
      )
      router.push("/online/loans")
    } else{
      Swal.fire(
        'Error',
        'Error updating profile',
        'error'
      )
    }
  }

  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-4 col-sm-12'>
          <LoansSideBar client={client!} />
        </div>
        <div className='col-md-8 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online/loans'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> All Loans
            </Link>
            <div className='text-gray-500 text-3xl border-bottom mb-10'>Loan Request</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='amount'>Amount Requested</label>
                  <input
                    type='number'
                    name='amount'
                    id='amount'
                    min={1000}
                    max={9000000}
                    step={100}
                    required={true}
                    aria-required={true}
                    className='form-control'
                    placeholder='Amount'
                    value={loan?.amount}
                    onChange={(e)=>{
                      calculateLoanRate(e,  Number(e.target.value))
                    }}
                  />
                </div>
                
              </div>

              <div className='row'>
                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='loan_rate'>Loan Rate</label>
                  <input
                    type='text'
                    name='loan_rate'
                    id='loan_rate'
                    className='form-control'
                    placeholder='Repeat Password'
                    value={loan?.rate}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <button className='btn btn-primary'>Request Loan</button>
                </div>
              </div>
            </form>
            {/* Tailwindcss Client Edit Profile form */}
          </div>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default ProfileIndex