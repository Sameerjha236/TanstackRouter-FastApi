import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiService from "../service/apiService";

type AuthCredentials = {
  username: string;
  password: string;
};

export function useLogin(redirectTo = "/todos") {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AuthCredentials) => apiService.login(data),
    onSuccess: () => {
      navigate({ to: redirectTo });
    },
  });
}

export function useSignup(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: AuthCredentials) => apiService.signup(data),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
