import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/dbConfig";
import { ContactInstance } from "../interface/contactInterface";


export const Contact = sequelize.define<ContactInstance | any>("Contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  email:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  linkPrecedence: {
    type: DataTypes.ENUM('secondary', 'primary'),
    defaultValue: 'primary',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},{   
    tableName:"contact"
});