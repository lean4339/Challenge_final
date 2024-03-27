/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Item from '../Item/Item';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../features/session"
interface IData {
  id: number;
  amount: number;
  createdAt: string;
  type: string;
  recipient: string;
}

const Table: React.FC<{ data: IData[], onChangeData: (data: any) => void }> = ({ data, onChangeData }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const itemsPerPage: number = 5;
  const { dictionary } = useSelector(selectLanguage)
  const filteredData: IData[] = data.filter(item =>
    item.recipient.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages: number = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const paginatedData: IData[] = filteredData.slice(startIndex, endIndex);

  const handleChangePage = (page: number): void => {
    setCurrentPage(page);
  };
  const handleDelete = (id: number): void => {
    const headers = {
      authorization: localStorage.getItem('token'),
    }
    axios.delete(`${import.meta.env.VITE_API_HOST}/payment/${id}`,{headers})
      .then((response) => {
        if (response.data.error) {
          toast(`Error: ${response.data.message}`, { theme: 'light', hideProgressBar: true })
        } else {
          onChangeData(data.filter(item => item.id !== id))
          toast('Delete Success', { theme: 'light', hideProgressBar: true })
        }
      })
      .catch((error) => {
        toast('error', { theme: 'light', hideProgressBar: true })
      })
  }
  const formatDate = (dates: string) => {
    const newDate = new Date(dates);
    const formattedDate = `${newDate.getDate()}/${(newDate.getMonth() + 1)}/${newDate.getFullYear()}`;
    return formattedDate;
  }
  return (
    <div className="container mx-auto bg-gray-100 py-8 px-4">
      <div className="flex justify-between align-middle py-2">


        <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline" to="/addPayment">{dictionary.lblAdd}</NavLink>

        <div>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <CSVLink data={data} filename='data.csv'>{dictionary.lblExportToCsv}</CSVLink>
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 rounded-md px-4 py-2 mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {data && data.length > 0 ? <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amout</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.recipient}</td>
                <td className="px-6 py-4 whitespace-nowrap"><Item id={item.id} name={item.type} amount={item.amount} onDelete={handleDelete} onUpdate={() => console.log(0)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <h3 className="overflow-x-auto">No data avaible</h3>}

      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currentPage === i + 1 ? 'bg-blue-700' : ''}`}
            onClick={() => handleChangePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Table;