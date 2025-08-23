export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  gender: string;
  imageUrl?: string;
  password: string;
  role: string;
  token?: string;
  resetOtp?: string;
  resetOtpExpiry?: Date;
}
