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
    emailNotice: boolean,
    smsNotice: boolean,
  }>({
    _id: '',
    emailNotice: true,
    smsNotice: false,
  });

  const [busy, setBusy] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!client || copied) return;
    setThisClient({
      ...thisClient,
      _id: String(client._id),
    });
    setCopied(true);
  }, [client, copied, busy, thisClient])



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBusy(true);
    e.preventDefault();

    // update password
    const result = await fetch(`/api/auth/update-notification`, {
      method: 'POST',
      body: JSON.stringify(thisClient),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();

    setBusy(false);
    if (data.success) {
      Swal.fire(
        'Success',
        'Notification updated successfully',
        'success'
      )
    } else {
      Swal.fire(
        'Error',
        'Error updating notification',
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
            <div className='text-gray-500 text-3xl border-bottom mb-10'>Update Notifications</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit}>
              <div className='row'>

                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='email_notice'>Email Notification</label>
                  {/* Check box */}
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value='1' checked={thisClient.emailNotice} id="email_notice" />
                    <label className="form-check-label" htmlFor="email_notice">
                      Enable Email Notice
                    </label>
                  </div>
                </div>

                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='mobile_notice'>Mobile Notification</label>
                  {/* Check box */}
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox"  value='1' checked={thisClient.smsNotice}  id="mobile_notice" />
                    <label className="form-check-label" htmlFor="mobile_notice">
                      Enable Mobile Notice
                    </label>
                  </div>
                </div>

              </div>

              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <button className='btn btn-primary'>Update Notification</button>
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