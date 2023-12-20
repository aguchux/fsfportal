import { Client } from '@/models'
import { toMoney } from '@/utils'
import Link from 'next/link'
import React from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

type Props = {
    client: Client
}

const ClientSideBar = (props: Props) => {
    const { client } = props
    const router = useRouter()

    
    const onDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const swal = await Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this client?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it!'
        })

        if(swal.isConfirmed){
            const response = await fetch(`/api/clients/delete?clientId=${client?._id}`, { method: 'DELETE' })
            const result = await response.json()
            if (result.success) {
                Swal.fire( 'Deleted!', 'Client deleted successfully', 'success')
                router.push('/online/clients');
            } else {
                Swal.fire( 'Failed!', result.message, 'error')
            }
        }

        // if (confirm('Are you sure you want to delete this client?')) {
        //     const response = await fetch(`/api/clients/${client?._id}`, { method: 'DELETE' })
        //     const result = await response.json()
        //     if (result.success) {
        //         alert('Client deleted successfully')
        //         window.location.href = '/online/clients'
        //     } else {
        //         alert(result.message)
        //     }
        // }
    }


    return (
        <>
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg text-center '>
                <Link href={`/online/clients/${client?._id}/funding`} className='bg-blue-500 hover:bg-blue-700 py-2 px-5 rounded-xl w-full text-gray-300 hover:text-white'>
                    <i className='fa fa-send'></i> Credit/Debit
                </Link>
                <hr className='mt-4' />
                <div className='text-gray-500'>Account Number</div>
                <div className='text-4xl font-bold text-green-800'>{client?.accid}</div>
                <div className='text-gray-500'>Account Password</div>
                <div className='text-4xl font-bold text-gray-400'>{client?.password}</div>
                <hr />
                <div className='text-gray-500'>Credit Balance</div>
                <div className='text-4xl font-bold text-green-500'>{toMoney(Number(client?.creditBalance), client?.accountCurrency)}</div>
                <hr />
                <div className="">
                    <Link href={`#`} onClick={onDelete} className='text-gray-100 px-2 py-1 bg-red-500 hover:bg-red-700 rounded-lg hover:text-white'>
                        <i className='fa fa-trash'></i> Delete
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ClientSideBar