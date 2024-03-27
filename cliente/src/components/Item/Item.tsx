import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectLanguage } from "../../features/session"
interface ItemProps {
  id: number;
  name: string;
  amount: number;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, amount, onDelete, onUpdate }) => {

  const { dictionary } = useSelector(selectLanguage)
  return (
    
        <div className="flex space-x-2">
          <NavLink to={`/editPayment/${id}`}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{dictionary.lblEdit}</NavLink>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => onDelete(id)}
          >
            {dictionary.lblDelete}
          </button>
        </div>
     
  );
};

export default Item;