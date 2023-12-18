import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import Swal from 'sweetalert2';
import ProfileSideBar from '@/components/online/ProfileSideBar';


const ProfileIndex = () => {
  const { client, update } = useAuth()
  const [copied, setCopied] = React.useState<boolean>(false);
  const [thisClient, setThisClient] = React.useState<OnClient>({} as OnClient);
  const [busy, setBusy] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!client || copied) return;
    setThisClient({
      _id: client._id,
      firstName: client.firstName,
      middleName: client.middleName!,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      emailNotice: client.emailNotice!,
      smsNotice: client.smsNotice!,
      address: client.address!,
      city: client.city!,
      zipcode: client.zipcode!,
      state: client.state!,
      country: client.country!,
    });
    setCopied(true);
  }, [client, copied, busy])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBusy(true);
    e.preventDefault();
    // validation
    const { firstName, lastName, email, phone, address, city, zipcode, state, country } = thisClient;
    if (!firstName || !lastName || !email || !phone || !address || !city || !zipcode || !state || !country) {
      Swal.fire(
        'Error',
        'Please fill all fields',
        'error'
      )
      setBusy(false);
      return;
    }
    // update client
    const updated = await update(thisClient);

    setBusy(false);
    if (updated.success) {
      Swal.fire(
        'Success',
        'Profile updated successfully',
        'success'
      )
    } else {
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

            <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashbaord
            </Link>

            <div className='text-gray-500 text-3xl border-bottom mb-10'>Update Profile</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    className='form-control'
                    placeholder='First Name'
                    value={thisClient?.firstName}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, firstName: String(e.target.value) })
                    }}
                  />
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='middleName'>Middle Name</label>
                  <input
                    type='text'
                    name='middleName'
                    id='middleName'
                    className='form-control'
                    placeholder='Middle Name'
                    value={thisClient?.middleName}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, middleName: String(e.target.value) })
                    }}
                  />
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='form-control'
                    placeholder='Last Name'
                    value={thisClient?.lastName}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, lastName: String(e.target.value) })
                    }}
                  />
                </div>
              </div>

              <div className='row bg-green-200 p-2 rounded-lg mb-3'>
                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='form-control'
                    placeholder='Email'
                    value={thisClient?.email}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, email: String(e.target.value) })
                    }}
                  />
                </div>
                <div className='form-group col-md-6 col-12'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    className='form-control'
                    placeholder='Phone'
                    value={thisClient?.phone}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, phone: String(e.target.value) })
                    }}
                  />
                </div>

              </div>


              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    className='form-control'
                    placeholder='Address'
                    value={thisClient?.address}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, address: String(e.target.value) })
                    }}
                  />
                </div>
                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    className='form-control'
                    placeholder='City'
                    value={thisClient?.city}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, city: String(e.target.value) })
                    }}
                  />
                </div>

                <div className='form-group col-md-3 col-12'>
                  <label htmlFor='zipcode'>Post Code</label>
                  <input
                    type='text'
                    name='zipcode'
                    id='zipcode'
                    className='form-control'
                    placeholder='zipcode'
                    value={thisClient?.zipcode}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, zipcode: String(e.target.value) })
                    }}
                  />
                </div>

                <div className='form-group col-md-4 col-12'>
                  <label htmlFor='state'>State</label>
                  <input
                    type='text'
                    name='state'
                    id='state'
                    className='form-control'
                    placeholder='State'
                    value={thisClient?.state}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, state: String(e.target.value) })
                    }}
                  />
                </div>
                <div className='form-group col-md-5 col-12'>
                  <label htmlFor='country'>Country</label>
                  <input
                    type='text'
                    name='country'
                    id='country'
                    className='form-control'
                    placeholder='Country'
                    value={thisClient?.country}
                    onChange={(e) => {
                      setThisClient({ ...thisClient, country: String(e.target.value) })
                    }}
                  />
                </div>

              </div>
              <div className='row'>
                <div className='form-group col-md-8 col-12'>
                  <button className='btn btn-primary'>Update Profile</button>
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