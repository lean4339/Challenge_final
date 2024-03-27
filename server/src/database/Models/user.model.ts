import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

interface User extends Model  {
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string
  created_at: Date
}

const User = sequelize.define<User>('users', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { tableName: 'users', timestamps:false });



// User.hasMany(Payment, { as: 'Payments', foreignKey: 'recipient' });
// User.hasMany(Payment, { as: 'Payer', foreignKey: 'creator' });

export {
  User
};
