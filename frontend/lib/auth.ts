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

export interface TaskFilters {
  search?: string;
  status?: string;
  priority?: string;
  dueDateBefore?: string; // ISO date string, e.g. '2025-05-10'
  dueDateAfter?: string; // ISO date string
}

export async function onSignUp(registrationData: registrationData) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    registrationData
  );
}

export async function onSignIn(loginData: loginData) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
    loginData,
    { withCredentials: true }
  );
}

export async function GetProfile() {
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,{
    withCredentials:true
  });
}

export async function listCreatedTasks() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/dashboard/created`
  );
}

export async function listAssignedTasks() {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/dashboard/assigned`
  );
}
// List all tasks using Search & filter in query params
export async function ListAllTasks(filters: TaskFilters = {}) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
    params: filters,
    withCredentials:true
  });
}

export async function CreateTask(data: any) {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, data, {
    withCredentials: true,
  });
}

export async function GetTask(taskId?: any) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${taskId}`);
}

export async function SearchUsers(query: any) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/search`, {
    params: { search: query },
  });
}

export async function AssignUsers(users: any) {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/search`, {});
}

export async function UpdateTask(taskId:any,data:any) {
  return axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${taskId}`, data);
}

export async function DeleteTask(taskId?: any) {
  return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${taskId}`);
}