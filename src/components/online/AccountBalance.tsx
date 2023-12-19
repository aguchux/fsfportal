import { Client } from '@/models'
import { toMoney } from '@/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  client: Client
}

const AccountBalance = (props: Props) => {
  const { client } = props
  return (
    <>
      <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
        <Link href={'/online/send-money'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
          <i className='fa fa-send'></i> Send Money
        </Link>
        <div className='text-gray-500 text-2xl'>Account Number</div>
        <div className='text-4xl font-bold text-green-800  my-2'>{client?.accid}</div>
        <hr />
        <div className="grid grid-cols-2">
          <span className='m-0 p-0 text-gray-400 text-md'><strong>SWIFT: </strong>{client?.swiftCode}</span>
          <span className='m-0 p-0 text-gray-400 text-md'><strong>SORT: </strong>{client?.sortCode}</span>
        </div>
        <hr />
        <div className='text-gray-500 text-2xl'>Account Balance</div>
        <div className='text-4xl font-bold my-2 text-red-700'>{toMoney(Number(client?.creditBalance), client?.accountCurrency)}</div>

      </div>
    </>
  )
}

export default AccountBalance
