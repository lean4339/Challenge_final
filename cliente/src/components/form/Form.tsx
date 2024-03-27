import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/session'
interface Payment {
  amount: number;
  type: string;
  recipient: string;
}

interface AddPaymentFormProps {
  onAdd: (payment: Payment) => void;
  payment?: Payment;
  text: string;
}

const Form: React.FC<AddPaymentFormProps> = ({ onAdd, payment, text }) => {
  const [amount, setAmount] = useState<number| null>(null);
  const [type, setType] = useState<string| null>(null);
  const [recipient, setRecipient] = useState<string| null>(null);
  const { dictionary } = useSelector(selectLanguage)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!payment){
      if (!amount || !type || !recipient ) {
        return;
      }else{
        if (amount && type  && recipient)
        onAdd({ amount:amount, type, recipient });
      }
    }else{
     
      onAdd({ amount: amount || payment.amount, type: type || payment.type, recipient: recipient || payment.recipient });
    }
  };
  return (

    <form onSubmit={handleSubmit} className="bg-gray-100 max-w-screen-sm  rounded px-8 pt-6 pb-8 mb-4 ">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
        {dictionary.lblAmount}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
          type="number"
          placeholder={dictionary.lblAmountPlaceholder}
          value={amount ||payment?.amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
        {dictionary.lblType}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="type"
          type="text"
          placeholder={dictionary.lblTypePlaceholder}
          value={type || payment?.type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
        {dictionary.lblRecipient}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="recipient"
          type="text"
          placeholder={dictionary.lblRecipientPlaceholder}
          value={recipient || payment?.recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {text}
        </button>
      </div>
    </form>
  );
};

export default Form;