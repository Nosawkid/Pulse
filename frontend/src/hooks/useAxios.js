import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
    const { auth, setAuth } = useAuth()




    useEffect(() => {
        const requestIntercept = axiosInstance.interceptors.request.use(
            (config) => {
                if (auth?.accessToken) {
                    config.headers.Authorization = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;

                if (error.response?.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    try {
                        const res = await axiosInstance.get("/auth/refresh", {
                            withCredentials: true,
                        });

                        setAuth((prev) => ({
                            ...prev,
                            accessToken: res.data.accessToken,
                            user: res.data.user,
                            role: res.data.user.role,
                        }));

                        prevRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                        return axiosInstance(prevRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed", refreshError);
                        setAuth(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        };
    }, [auth, setAuth]);

    return axiosInstance

}

export default useAxios