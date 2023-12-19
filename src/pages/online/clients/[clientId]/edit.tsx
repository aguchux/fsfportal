import React from 'react'
import { OnlineLayout } from '@/components/layouts/OnlineLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Client, Loan } from '@/models';
import { toMoney } from '@/utils';
import { useRouter } from 'next/router';
import ClientSideBar from '@/components/online/ClientSideBar';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import Image from 'next/image';


const EditIndex = () => {

  const { client } = useAuth()
  const [loans, setLoans] = React.useState<Loan[]>([] as Loan[]);
  const [clientInfo, setClientInfo] = React.useState<Client>({} as Client);
  const [busy, setBusy] = React.useState<boolean>(false);



  const router = useRouter();
  const { clientId } = router.query;

  React.useEffect(() => {
    const getClient = async () => {
      setBusy(true);
      try {
        const response = await fetch(`/api/clients/view?clientId=${clientId}`);
        const result = await response.json();
        if (result.success) {
          setClientInfo(result.data);
        }
      } finally {
        setBusy(false);
      }
    }
    getClient();
  }, [clientId])


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    values: {
      accid: clientInfo.accid,
      password: clientInfo.password,
      title: clientInfo.title,
      gender: clientInfo.gender,
      firstName: clientInfo.firstName,
      middleName: clientInfo.middleName,
      lastName: clientInfo.lastName,
      birthDay: clientInfo.birthDay,
      email: clientInfo.email,
      phone: clientInfo.phone,
      address: clientInfo.address,
      city: clientInfo.city,
      state: clientInfo.state,
      zipcode: clientInfo.zipcode,
      country: clientInfo.country,
      idType: clientInfo.idType,
      idNumber: clientInfo.idNumber,
      idExpiry: clientInfo.idExpiry,
      idImageFront: clientInfo.idImageFront,
      idImageBack: clientInfo.idImageBack,
      profileImage: clientInfo.profileImage,
      swiftCode: clientInfo.swiftCode,
      sortCode: clientInfo.sortCode,
      routingNumber: clientInfo.routingNumber,
      ibanNumber: clientInfo.ibanNumber,
      accountType: clientInfo.accountType,
      accountCurrency: clientInfo.accountCurrency,
      creditBalance: clientInfo.creditBalance,
      loanBalance: clientInfo.loanBalance,
      fixedBalance: clientInfo.fixedBalance,
      transferCodeTitle: clientInfo.transferCodeTitle,
      transferCode: clientInfo.transferCode,
      transferCodeMode: clientInfo.transferCodeMode,
      transferCodeDescription: clientInfo.transferCodeDescription,
      disabled: clientInfo.disabled,
      createdAt: clientInfo.createdAt,
      updatedAt: clientInfo.updatedAt,
    }
  });

  const onSubmit = async (data: any) => {
    try {
      setBusy(true);
      const response = await fetch(`/api/clients/edit?clientId=${clientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Client updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        // router.push(`/online/clients/${clientId}`);
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {

    } finally {
      setBusy(false);
    }
  }

  return (
    <OnlineLayout>
      <div className='row'>

        <div className='col-md-3 col-sm-12'>
          {busy ? <h3>Laoding....</h3> : <ClientSideBar client={clientInfo!} />}
        </div>

        <div className='col-md-9 col-sm-12'>
          <form autoComplete='off' autoCorrect='off' onSubmit={handleSubmit(onSubmit)}>
            <div className='bg-white rounded-lg p-4 min-h-[138px] shadow-lg'>
              <span className='float-right -mt-4 space-x-3'>
                <Link href={'/online'} className='text-gray-500 hover:text-blue-800'>
                  <i className='fa fa-credit-card'></i> Dashboard
                </Link>
                <Link href={'/online/add-client'} className='text-green-700 hover:text-green-900'>
                  <i className='fa fa-plus'></i>
                  Add Client
                </Link>
              </span>
              <div className='text-gray-500 text-3xl border-bottom my-3'>Client: {" "}
                <strong>
                  {clientInfo.firstName} {clientInfo.middleName} <strong>{clientInfo.lastName}</strong>
                </strong>
              </div>
              <div className='row'>


                <div className='col-12 my-2 bg-green-200 p-2 rounded-lg'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>CREDIT BALANCE</th>
                        <th className='px-4 py-1'>LOAN BALANCE</th>
                        <th className='px-4 py-1'>FIXED DEPOSIT</th>
                        <th className='px-4 py-1'>TOTAL CREDIT</th>
                        <th className='px-4 py-1'>TOTAL DEBIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>{toMoney(Number(clientInfo?.creditBalance), clientInfo?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(clientInfo?.loanBalance), clientInfo?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(clientInfo?.fixedBalance), clientInfo?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(0), clientInfo?.accountCurrency)}</td>
                        <td className='border px-4 py-1'>{toMoney(Number(0), clientInfo?.accountCurrency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>TITLE</th>
                        <th className='px-4 py-1'>GENDER</th>
                        <th className='px-4 py-1'>FIRST NAME</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("title")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("gender")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("firstName")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>MIDDLE NAME</th>
                        <th className='px-4 py-1'>LAST NAME</th>
                        <th className='px-4 py-1'>BIRTH DAY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("middleName")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("lastName")} /></td>
                        <td className='border px-4 py-1'><input type="date" className='textEditor' {...register("birthDay")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>EMAIL</th>
                        <th className='px-4 py-1'>MOBILE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("email")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("phone")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>ACCOUNT TYPE</th>
                        <th className='px-4 py-1'>CURRENCY</th>
                        <th className='px-4 py-1'></th>
                        <th className='px-4 py-1'></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>
                          <select id="accountType" className='textEditor' {...register("accountType")} >
                            <option value="Personal">Personal</option>
                            <option value="Business">Business</option>
                            <option value="Loan">Loan</option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                          </select>
                        </td>
                        <td className='border px-4 py-1'>
                          <select id="accountCurrency" className='textEditor' {...register("accountCurrency")} >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          </select>

                        </td>
                        <td className='border px-4 py-1'></td>
                        <td className='border px-4 py-1'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>




                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>ADDRESS</th>
                        <th className='px-4 py-1'>CITY</th>
                        <th className='px-4 py-1'>STATE</th>
                        <th className='px-4 py-1'>POST CODE</th>
                        <th className='px-4 py-1'>COUNTRY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("address")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("city")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("state")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("zipcode")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("country")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>ID.TYPE</th>
                        <th className='px-4 py-1'>ID.NUMBER</th>
                        <th className='px-4 py-1'>ID.EXPIRY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>
                          <select id="transferCodeMode" className='textEditor' {...register("idType")} >
                            <option value="PASSPORT">PASSPORT</option>
                            <option value="NATIONAL ID">NATIONAL ID</option>
                            <option value="DRIVERS LICENSE">DRIVERS LICENSE</option>
                            <option value="OTHER ID">OTHER ID</option>
                          </select>
                        </td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("idNumber")} /></td>
                        <td className='border px-4 py-1'><input type="date" className='textEditor' {...register("idExpiry")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>




                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>ID.IMAGE(FRONT)</th>
                        <th className='px-4 py-1'>ID.IMAGE(BACK)</th>
                        <th className='px-4 py-1'>PROFILE PHOTO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>
                          <Image src={`/assets/uploads/placeholder.png`} height={100} width={100} alt='' />
                        </td>
                        <td className='border px-4 py-1'>
                          <Image src={`/assets/uploads/placeholder.png`} height={100} width={100} alt='' />
                        </td>
                        <td className='border px-4 py-1'>
                          <Image src={`/assets/uploads/placeholder.png`} height={100} width={100} alt='' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>SWIFT CODE</th>
                        <th className='px-4 py-1'>SORT CODE</th>
                        <th className='px-4 py-1'>ROUTING NUMBER</th>
                        <th className='px-4 py-1'>IBAN NUMBER</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("swiftCode")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("sortCode")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("routingNumber")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("ibanNumber")} /></td>

                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>ENABLE CODE</th>
                        <th className='px-4 py-1'>TRANSFER CODE TITLE</th>
                        <th className='px-4 py-1'>TRANSFER CODE</th>
                        <th className='px-4 py-1'>MODE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>
                        <select id="disabled" className='textEditor'>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </select>
                        </td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("transferCodeTitle")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("transferCode")} /></td>
                        <td className='border px-4 py-1'>
                          <select id="transferCodeMode" className='textEditor' {...register("transferCodeMode")} >
                            <option value="STOP">STOP</option>
                            <option value="FAIL">FAIL</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>




                <div className='col-12 my-2'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>TRANSFER CODE DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1'>
                          <textarea id="transferCodeDescription" className='textEditor my-2' {...register("transferCodeDescription")}></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                                
              <div className='col-12 my-2 bg-red-400 p-2 rounded-lg'>
                  <table className='table-auto w-full mb-2'>
                    <thead>
                      <tr>
                        <th className='px-4 py-1'>DISABLE CLIENT</th>
                        <th className='px-4 py-1'>ACCOUNT NUMBER</th>
                        <th className='px-4 py-1'>CHANGE PASSWORD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border px-4 py-1 flex h-full'>
                          <select id="disabled" className='textEditor' {...register("disabled")} >
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </select>

                          
                        </td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("accid")} /></td>
                        <td className='border px-4 py-1'><input type="text" className='textEditor' {...register("password")} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div className='col-12 my-2'>
                  {/* Button */}
                  <div className='mt-0 text-left'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      aria-disabled={busy}
                      disabled={busy}
                    >
                      Update Client
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>

    </OnlineLayout>
  )
}

export default EditIndex