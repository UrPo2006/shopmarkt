export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}
