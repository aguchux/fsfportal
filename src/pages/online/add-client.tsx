import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';


const AddClientIndex = () => {
  const [busy, setBusy] = React.useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    values: {
      accid: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipcode: "",
      state: "",
      country: "",
      accountType: "Personal",
      accountCurrency: "USD",
      title: "Mr",
      gender: "Male",
      birthDay: ""
    }
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      setBusy(true);
      const response = await fetch('/api/clients/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const updated = await response.json();
      if (updated.success) {
        const resp = await Swal.fire(
          'Success',
          'Client created successfully',
          'success'
        )
        if (resp.isConfirmed) {
          const { _id } = updated.data;
          router.push(`/online/clients/${_id}/edit`);
        }
      } else {
        Swal.fire(
          'Error',
          'Error creating new client',
          'error'
        )
      }

    } catch (error) {

    } finally {
      setBusy(false);
    }
  }

  return (
    <OnlineLayout>

      <div className='row'>

        <div className='col-md-12 col-sm-12'>
          <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>

            <Link href={'/online'} className='float-right -mt-4 text-gray-500 hover:text-blue-800'>
              <i className='fa fa-credit-card'></i> Dashbaord
            </Link>

            <div className='text-gray-500 text-3xl border-bottom mb-10'>Create New Client</div>
            {/* Tailwindcss Client Edit Profile form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-md-4 col-sm-12'>
                  <div className='bg-green-100 rounded-lg min-h-[138px] shadow-lg p-4'>
                    <div className='row'>
                      <div className='form-group col-md-12 col-12'>
                        <label htmlFor='accid'>Account Number</label>
                        <input
                          type='text'
                          name='accid'
                          id='accid'
                          className='form-control'
                          placeholder='Account Number'
                          {...register("accid", { required: true })}
                        />
                        {/* error */}
                        {errors.accid && <span className='text-red-500'>Account Number is required</span>}
                      </div>
                      <div className='form-group col-md-12 col-12'>
                        <label htmlFor='password'>Password</label>
                        <input
                          type='text'
                          name='password'
                          id='password'
                          className='form-control'
                          placeholder='Password'
                          {...register("password", { required: true, minLength: 4, maxLength: 12 })}
                        />
                        {/* error */}
                        {errors.password && <span className='text-red-500'>Password is required</span>}
                      </div>
                      <div className='form-group col-md-12 col-12'>
                        <label htmlFor='accountType'>Account Type</label>
                        <select id="accountType" className='textEditor' {...register("accountType")} >
                          <option value="Personal">Personal</option>
                          <option value="Business">Business</option>
                          <option value="Loan">Loan</option>
                          <option value="Fixed Deposit">Fixed Deposit</option>
                        </select>
                      </div>

                      <div className='form-group col-md-12 col-12'>
                        <label htmlFor='accountCurrency'>Account Currency</label>
                        <select id="accountCurrency" className='textEditor' {...register("accountCurrency")} >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-8 col-sm-12'>

                  <div className='row'>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='title'>Title</label>
                      <select id="title" className='textEditor' {...register("title")} >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                      </select>
                    </div>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='gender'>Gender</label>
                      <select id="gender" className='textEditor' {...register("gender")} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='birthDay'>Birth Day</label>
                      <input
                        type='date'
                        name='birthDay'
                        id='birthDay'
                        className='form-control'
                        placeholder='Birth Day'
                        {...register("birthDay", { required: true })}
                      />
                      {/* error */}
                      {errors.birthDay && <span className='text-red-500'>Birth Day is required</span>}
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='firstName'>First Name</label>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='form-control'
                        placeholder='First Name'
                        {...register("firstName", { required: true })}
                      />
                      {/* error */}
                      {errors.firstName && <span className='text-red-500'>First Name is required</span>}
                    </div>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='middleName'>Middle Name</label>
                      <input
                        type='text'
                        name='middleName'
                        id='middleName'
                        className='form-control'
                        placeholder='Middle Name'
                        {...register("middleName", { required: true })}
                      />
                      {/* error */}
                      {errors.middleName && <span className='text-red-500'>Middle Name is required</span>}
                    </div>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        className='form-control'
                        placeholder='Last Name'
                        {...register("lastName", { required: true })}
                      />
                      {/* error */}
                      {errors.lastName && <span className='text-red-500'>Last Name is required</span>}
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
                        {...register("email", { required: true })}
                      />
                      {/* error */}
                      {errors.email && <span className='text-red-500'>Email is required</span>}
                    </div>
                    <div className='form-group col-md-6 col-12'>
                      <label htmlFor='phone'>Phone</label>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        className='form-control'
                        placeholder='Phone'
                        {...register("phone", { required: true })}
                      />
                      {/* error */}
                      {errors.phone && <span className='text-red-500'>Phone is required</span>}
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
                        {...register("address", { required: true })}
                      />
                      {/* error */}
                      {errors.address && <span className='text-red-500'>Address is required</span>}
                    </div>
                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='city'>City</label>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        className='form-control'
                        placeholder='City'
                        {...register("city", { required: true })}
                      />
                      {/* error */}
                      {errors.city && <span className='text-red-500'>City is required</span>}
                    </div>

                    <div className='form-group col-md-3 col-12'>
                      <label htmlFor='zipcode'>Post Code</label>
                      <input
                        type='text'
                        name='zipcode'
                        id='zipcode'
                        className='form-control'
                        placeholder='zipcode'
                        {...register("zipcode", { required: true })}
                      />
                      {/* error */}
                      {errors.zipcode && <span className='text-red-500'>Post Code is required</span>}
                    </div>

                    <div className='form-group col-md-4 col-12'>
                      <label htmlFor='state'>State</label>
                      <input
                        type='text'
                        name='state'
                        id='state'
                        className='form-control'
                        placeholder='State'
                        {...register("state", { required: true })}
                      />
                      {/* error */}
                      {errors.state && <span className='text-red-500'>State is required</span>}
                    </div>
                    <div className='form-group col-md-5 col-12'>
                      <label htmlFor='country'>Country</label>
                      <input
                        type='text'
                        name='country'
                        id='country'
                        className='form-control'
                        placeholder='Country'
                        {...register("country", { required: true })}
                      />
                      {/* error */}
                      {errors.country && <span className='text-red-500'>Country is required</span>}
                    </div>

                  </div>
                  <div className='row'>
                    <div className='form-group col-md-12 col-12'>
                      <button type='submit' className='btn btn-primary'>Create Client</button>
                    </div>
                  </div>
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

export default AddClientIndex