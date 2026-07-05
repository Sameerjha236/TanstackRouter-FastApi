import apiService from "../service/apiService";

export async function checkAuth(): Promise<boolean> {
  try {
    await apiService.getMe();
    return true;
  } catch {
    return false;
  }
}
