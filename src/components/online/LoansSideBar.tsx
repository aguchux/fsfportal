import { Client } from '@/models'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/hooks'
import { toMoney } from '@/utils'

type Props = {
    client: Client
}

const LoansSideBar = ({ client }: Props) => {
    const {logout} = useAuth();
    
    const handleAuth = () =>{
        logout("/auth");
    }
    return (
        <>

        
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> Move Funds
                </Link>
                <div className='text-gray-500'>Loan Account</div>
                <div className='text-4xl font-bold text-red-700'>{toMoney(Number(client?.loanBalance), client?.accountCurrency)}</div>
                <span className='m-0 p-0 text-gray-400'><strong>Interest: </strong>{toMoney(Number(0), client?.accountCurrency)}</span>
                {/* tailwincss side menu bar */}
                <ul className='list-group list-group-flush mt-3'>
                    <li className='list-group-item'>
                        <Link href={'/online/request-loan'} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-credit-card'></i> Request Loan
                        </Link>
                    </li>
                    {/* <li className='list-group-item'>
                        <Link href={'/online/repay-loan'} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-credit-card'></i> Repay Loan
                        </Link>
                    </li> */}
                    <li className='list-group-item'>
                        <Link href={'/online/logout'} onClick={()=>handleAuth()} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-sign-out'></i> Logout
                        </Link>
                    </li>
                </ul>
                {/* tailwincss side menu bar */}
            </div>
        </>
    )
}

export default LoansSideBar