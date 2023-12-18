import { Client } from '@/models'
import { toMoney } from '@/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    client: Client
}


const ClientSideBar = (props: Props) => {
    const { client } = props
    return (
        <>
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
                <Link href={'#'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                    <i className='fa fa-send'></i> Credit/Debit Account
                </Link>
                <hr className='mt-4' />
                <div className='text-gray-500'>Account Number</div>
                <div className='text-4xl font-bold text-green-800'>{client?.accid}</div>
                <div className='text-gray-500'>Account Password</div>
                <div className='text-4xl font-bold text-gray-400'>{client?.password}</div>
                <hr />
                <div className='text-gray-500'>Credi Balance</div>
                <div className='text-4xl font-bold text-green-500'>{ toMoney( Number(client?.creditBalance),client?.accountCurrency)}</div>
                <hr />
                <div className="flex flex-column gap-0"></div>
            </div>
        </>
    )
}

export default ClientSideBar