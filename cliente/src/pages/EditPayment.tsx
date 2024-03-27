/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Form from "../components/form/Form"
import { useSelector } from "react-redux";
import { selectUser, selectLanguage } from "../features/session"
import { ToastContainer, toast } from 'react-toastify';
interface Payment {
    amount: number;
    type: string;
    recipient: string;
    createdAt: string;
}
const EditPayment = () => {
    const [payment, setPayment] = useState<Payment | null>(null)
    const { id } = useParams()
    const user = useSelector(selectUser);
    const { dictionary } = useSelector(selectLanguage)
    useEffect(() => {
        const fetch = async () => {
            const headers = {
                authorization: localStorage.getItem('token'),
              }
            axios.get(`${import.meta.env.VITE_API_HOST}/payment/${id}`,{headers})
                .then((response: any) => {
                    setPayment(response.data.data)
                })
        }
        fetch()
    }, [])

    const handleSubmit = (data: any) => {
        const body = { ...data }
        body.creator = user.id
        body.createdAt = payment?.createdAt
        const headers = {
            authorization: localStorage.getItem('token'),
          }
        axios.put(`${import.meta.env.VITE_API_HOST}/payment/${id}`, body,{headers})
            .then((response) => {
                if (response.data.status === 'success') {
                    toast('payment edited successfully', { theme: 'light', hideProgressBar: true })
                } else {

                    toast(`Error: ${response.data.message}`, { theme: 'light', hideProgressBar: true })
                }
                console.log(response)
            })
            .catch((error) => {
                toast(`Error: ${error.message}`, { theme: 'light', hideProgressBar: true })
                console.log(error)
            });
    }
    return (
        <>{payment && <Form text={dictionary.lblEdit} payment={payment} onAdd={handleSubmit} />}

            <ToastContainer />
        </>
    )
}
export default EditPayment