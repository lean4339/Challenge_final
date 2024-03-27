import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

interface PaymentType extends Model {
  id?: number;
  creator: number;
  amount: number;
  createdAt: Date;
  type: string;
  recipient: string;
}

const Payment = sequelize.define<PaymentType>('payments', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  creator: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { tableName: 'payments' , timestamps: false});




export {
  Payment
};
