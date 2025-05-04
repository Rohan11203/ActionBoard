import axios from "axios";
axios.defaults.withCredentials = true;
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
  return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, loginData,
    { withCredentials: true }
  );
}



// List all tasks using Search & filter in query params
export async function ListAllTasks(queryParams?: Record<string, any>) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {

    params: queryParams,
  });
}

export async function CreateTask(data:any) {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,data, 
    {withCredentials: true}
  )
}