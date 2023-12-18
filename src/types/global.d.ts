
type ResponseData = {
  success: boolean;
  message: string;
  data?: Client | string | null | undefined;
  error?: any;
}

interface OnClient {  
  _id?:any,
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  emailNotice: boolean;
  smsNotice: boolean;
}
