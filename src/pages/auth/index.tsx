import React from 'react'
import { AuthLayout } from '@/components/layouts/AuthLayout';
import dynamic from 'next/dynamic';
const LoginForm = dynamic(() => import('@/components/online/LoginForm'), { ssr: false });

const AuthIndex = () => {
  return (
    <AuthLayout>
        <LoginForm />
    </AuthLayout>
  )
}

export default AuthIndex
