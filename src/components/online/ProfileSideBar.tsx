import { Client } from '@/models'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/hooks'

type Props = {
    client: Client
}

const ProfileSideBar = ({ client }: Props) => {
    const {logout} = useAuth();
    
    const handleAuth = () =>{
        logout("/auth");
    }
    return (
        <>
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
                <Link href={'/online/profile'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
                    <i className='fa fa-user'></i> Edit Profile
                </Link>
                <div className='text-gray-500'>Account Name</div>
                <div className='text-4xl font-bold my-1'>
                    <span>{client?.lastName}</span> <span>{client?.firstName}</span>
                </div>
                <span className='m-0 p-0 text-gray-400'><strong>Account Type: </strong>{client?.accountType} ({client?.accountCurrency})</span>
                {/* tailwincss side menu bar */}
                <ul className='list-group list-group-flush mt-3'>
                    <li className='list-group-item'>
                        <Link href={'/online/profile'} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-user'></i> Edit Profile
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link href={'/online/change-password'} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-lock'></i> Change Password
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link href={'/online/notifications'} className='text-gray-500 hover:text-blue-800'>
                            <i className='fa fa-bell'></i> Notifications
                        </Link>
                    </li>
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

export default ProfileSideBar