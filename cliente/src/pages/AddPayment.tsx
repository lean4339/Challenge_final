/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "../components/form/Form";
import axios from "axios"
import { useSelector } from "react-redux";
import { selectUser, selectLanguage } from "../features/session"
import { ToastContainer, toast } from 'react-toastify';
const AddPayment = () => {
    const user = useSelector(selectUser);
    const { dictionary } = useSelector(selectLanguage)
    const create = (data: any) => {
        const body = { ...data }
        body.creator = user.id
        const headers = {
            authorization: localStorage.getItem('token'),
          }
        axios.post(`${import.meta.env.VITE_API_HOST}/payment`, body,{headers})
            .then((response) => {
                if (response.data.status === 'success') {
                    toast('payment created successfully', { theme: 'light', hideProgressBar: true })
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
        <>
            <Form text={dictionary.lblAdd} onAdd={create} />
            <ToastContainer />
        </>
    )
}

export default AddPayment;