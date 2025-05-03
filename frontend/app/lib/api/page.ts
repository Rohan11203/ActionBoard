import axios from "axios";

interface registrationData {
  username: String;
  email: String;
  password: String;
}

interface loginData {
  email: String;
  password: String;
}

export async function onSignUp(registrationData: registrationData) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    registrationData
  );
}

export async function onSignIn(loginData: loginData) {
  return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, loginData);
}
