/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Table from "../components/table/Table";
import axios from "axios";

const Home = () => {
    const [data,setData] = useState(null)
    useEffect(()=> {
        const fetch = async () => {
            const headers = {
                authorization: localStorage.getItem('token'),
              }
            const response = await axios.get<any>(`${import.meta.env.VITE_API_HOST}/payment`,{headers})
            console.log(response.data)
            setData(response.data.data);
            
        }
        fetch();
    },[])
    const onchangeData = (data: any) => {
        setData(data);
    }
    return (
        <>
        {data && <Table onChangeData={onchangeData} data={data}/>}
        </>
    )
}

export default Home;