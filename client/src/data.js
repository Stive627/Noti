import { useEffect, useState } from "react"
import { api } from "./ApiRest"


export function useGetData() {
    const [data, setData] = useState()
    const [reload, setReload] = useState(false)
    useEffect(() => {
        if (!data || reload) {
            api.get('profile/')
            .then((response) => {
            setData(response.data)
            console.log(response.data)
            })
            .catch(function (error) {
            console.log(error.response.data)
            })
    }
    }, [reload])
    return {data, setData, setReload, reload}
}