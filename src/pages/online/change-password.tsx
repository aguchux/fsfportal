import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import ProfileSideBar from '@/components/online/ProfileSideBar';


const ProfileIndex = () => {
  const { client, update } = useAuth()
  const [copied, setCopied] = React.useState<boolean>(false);
  
  const [thisClient, setThisClient] = React.useState<{
    _id: string,
    password:string,
    repeat_password:string,
  }>({
    _id: '',
    password: '',
    repeat_password: '',
  });

  const [busy, setBusy] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!client || copied) return;
    setThisClient({
      ...thisClient,
      _id:  String(client._id),
    });
    setCopied(true);
  }, [client, copied, busy, thisClient])



  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setBusy(true);
    e.preventDefault();
    // validation
    const { password,repeat_password } = thisClient;
    if (!password ) {
      Swal.fire(
        'Error',
        'Please fill all fields',
        'error'
      )
      setBusy(false);
      return;
    }

    if (password.length < 6) {
      Swal.fire(
        'Error',
        'Password must be at least 6 characters',
        'error'
      )
      setBusy(false);
      return;
    }

    if (password !== repeat_password) {
      Swal.fire(
        'Error',
        'Passwords do not match',
        'error'
      )
      setBusy(false);
      return;
    }

    // update password
    const result = await fetch(`/api/auth/update-password`,{
      method: 'POST',
      body: JSON.stringify(thisClient),
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
          <ProfileSideBar client={client!} />
        </div>
        <div className='col-md-8 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
            <Link href={'/online/profile'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Edit Profile
            </Link>
            <div className='text-gray-500 text-3xl border-bottom mb-10'>Update Password</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    placeholder='Password'
                    value={thisClient?.password}
                    onChange={(e)=>{
                      setThisClient({...thisClient, password: String(e.target.value)})
                    }}
                  />
                </div>
                
              </div>

              <div className='row'>
                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='repeat_password'>Repeat Password</label>
                  <input
                    type='password'
                    name='repeat_password'
                    id='repeat_password'
                    className='form-control'
                    placeholder='Repeat Password'
                    value={thisClient?.repeat_password}
                    onChange={(e)=>{
                      setThisClient({...thisClient, repeat_password: String(e.target.value)})
                    }}
                  />
                </div>
                
              </div>

              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <button className='btn btn-primary'>Update Password</button>
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