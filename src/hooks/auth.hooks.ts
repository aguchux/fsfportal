import { Client } from "@/models"
import { getCookie } from "cookies-next"
import next from "next"

import { useEffect } from "react"

import { useState } from "react"

export const useAuth =  () => {
   
    const [isAuth, setIsAuth] = useState(false)
    const [client, setClient] = useState<Client | null>(null)

    const token = getCookie('token');
    useEffect(() => {
        if (Boolean(token)) {
            setIsAuth(true)
            handleGetClient()
        }
    }, [token])

    const handleGetClient = async (): Promise<Client | null> => {
        const response = await fetch('/api/auth/client');
        const result:ResponseData = await response.json();
        if (result.success) {
            setClient(result.data);
            return result.data;
        }
        return null;
    }

    const handleLogout = async (): Promise<boolean> => {
        const logout = await fetch('/api/auth/logout');
        const data = await logout.json();
        if (data.success) {
            setIsAuth(false);
            return true;
        }
        return false;
    }

    const logout = (pathUrl:string) => {
        handleLogout().then((done) => {
            if (done)
            window.location.href = pathUrl
        })
    }

    const update = async (client:OnClient): Promise<ResponseData> => {
        const logout = await fetch(`/api/auth/update`,{
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await logout.json();
        return data;
    }

    return {
        isAuth,
        client,
        update,
        logout
    }
}