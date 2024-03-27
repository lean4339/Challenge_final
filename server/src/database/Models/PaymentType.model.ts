import { DataTypes } from "sequelize";
import { sequelize } from "../index";
const PaymentType = sequelize.define('PaymentTypes', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { tableName: 'paymentTypes' , timestamps: false});



// PaymentType.hasMany(Book, { as: 'books', foreignKey: 'PaymentTypeId' });
// Book.belongsTo(PaymentType, {
//   foreignKey: "PaymentTypeId",
// });

export {
  PaymentType
};
