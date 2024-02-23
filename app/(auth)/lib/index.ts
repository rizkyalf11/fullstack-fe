import { BaseResponseSuccess, axiosClient } from "@/lib/axiosClient"
import { LoginPayload, LoginResponse, LupaPwPayload, RegisterPayload, RegisterRespose, ResetPwPayload } from "../interface"
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const useAuthModule = () => {
  const router = useRouter();
  const { toastError, toastSuccess, toastWarning } = useToast();

  // register
  const register = async (payload: RegisterPayload): Promise<RegisterRespose> => {
    return axiosClient.post('/auth/register', payload).then((res) => res.data);
  }

  const useRegister = () => {
    const [errValidate, setErrValidate] = useState<string[]>([])
    const handleTyping = (name: string) => {
      setErrValidate((val) => {
        const filter = val.filter((item: string) => item?.includes(name) === false)

        return filter
      })
    }
    const handleShowErr = (name: string) => {
      const msg = errValidate.find((item: string) => {
        item?.includes(name)
      })

      console.log(msg)

      return msg
    }

    const { mutate, isLoading } = useMutation(
      (payload: RegisterPayload) => register(payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push('/login')
        },
        onMutate: () => {
          setErrValidate([]);
        },
        onError: (err: any) => {
          // console.log('er', err.response.data.message);

          if(err.response.status == 302) {
            return toastWarning(err.response.data.message);
          }

          if(err.response.status === 400) {
            setErrValidate(err.response.data.message)
            toastWarning(err.response.data.message);
          }

        }
      }
    );

    return { mutate, isLoading, handleTyping, handleShowErr }
  }

  // login
  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          console.log("🚀 ~ onSuccess: ~ response:", response)
          await signIn('credentials', { 
            id: response.data.id,
            name: response.data.nama,
            role: response.data.role,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            redirect: false 
          })
          toastSuccess(response.message);
          if(response.data.role === 'admin') {
            console.log('y')
            return router.push('/admin')
          } else {
            console.log('y')
            router.push("/siswa");
          }
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  // lupa pw
  const lupaPw = async (payload: LupaPwPayload): Promise<BaseResponseSuccess> => {
    return axiosClient.post("/auth/lupa-password", payload).then((res) => res.data);
  };

  const useLupaPw = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LupaPwPayload) => lupaPw(payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push('/login')
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      } 
    );

    return { mutate, isLoading }
  }

  // reset pw
  const resetPw = async (payload: ResetPwPayload, id: string, token: string): Promise<BaseResponseSuccess> => {
    return axiosClient.post(`/auth/lupa-password/${id}/${token}`, payload).then((res) => res.data);
  };

  const useResetPw = (id: string, token: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: ResetPwPayload) => resetPw(payload, id, token),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push('/login')
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      } 
    );

    return { mutate, isLoading }
  }

  return { useRegister, useLogin, useLupaPw, useResetPw }
}

export default useAuthModule