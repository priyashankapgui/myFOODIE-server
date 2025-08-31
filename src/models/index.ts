import User from "./user";
import MgmtEmp from "./management-employee";
import NomalEmp from "./nomal-employee";
import Supplyer from "./supplyer";
import Department from "./department";
import Order from "./order";
import OrderItem from "./orderItems";
import FoodItem from "./foodItem";
import Feedback from "./feedback";
import OrderSummary from "./order-summary";
import Transaction from "./transaction";

//mgmtEmp and nomalEmp are one to one relationship with user
User.hasOne(MgmtEmp, {
  foreignKey: "userId",
  as: "managementEmployee",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MgmtEmp.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//nomalEmp and user are one to one relationship
User.hasOne(NomalEmp, {
  foreignKey: "userId",
  as: "normalEmployee",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
NomalEmp.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//department and nomalEmp are one to many relationship
Department.hasMany(NomalEmp, {
  foreignKey: "departmentId",
  as: "normalEmployees",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
NomalEmp.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//supplyer and user are one to one relationship
User.hasOne(Supplyer, {
  foreignKey: "userId",
  as: "supplyer",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Supplyer.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//user and order are one to many relationship
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//supplyer and foodItem are one to many relationship
Supplyer.hasMany(FoodItem, {
  foreignKey: "supplierId",
  as: "foodItems",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
FoodItem.belongsTo(Supplyer, {
  foreignKey: "supplierId",
  as: "supplier",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//order and foodItem are many to one relationship
FoodItem.hasMany(Order, {
  foreignKey: "foodId",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(FoodItem, {
  foreignKey: "foodId",
  as: "foodItem",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//order and employee are one to one relationship
Order.hasOne(User, {
  foreignKey: "userId",
  as: "employee",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.belongsTo(Order, {
  foreignKey: "userId",
  as: "order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//order and department are one to many relationship
Department.hasMany(Order, {
  foreignKey: "departmentId",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//order and orderItem are one to many relationship
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "orderItems",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//foodItem and orderItem are one to many relationship
FoodItem.hasMany(OrderItem, {
  foreignKey: "foodItemId",
  as: "orderItems",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(FoodItem, {
  foreignKey: "foodItemId",
  as: "foodItem",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//user and orderItem are one to many relationship
User.hasMany(OrderItem, {
  foreignKey: "userId",
  as: "orderItems",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//user and feedback are one to many relationship
User.hasMany(Feedback, { foreignKey: "userId", as: "feedbacks" });
Feedback.belongsTo(User, { foreignKey: "userId", as: "user" });

//supplyer and orderSummary are one to many relationship
Supplyer.hasMany(OrderSummary, {
  foreignKey: "supplierId",
  as: "orderSummaries",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderSummary.belongsTo(Supplyer, {
  foreignKey: "supplierId",
  as: "supplier",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//supplyer and feedback are one to many relationship
Supplyer.hasMany(Feedback, {
  foreignKey: "supplierId",
  as: "feedbacks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Feedback.belongsTo(Supplyer, {
  foreignKey: "supplierId",
  as: "supplier",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//supplyer and  order are one to many relationship
Supplyer.hasMany(Order, {
  foreignKey: "supplierId",
  as: "orders",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(Supplyer, {
  foreignKey: "supplierId",
  as: "supplier",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//user and transaction are one to many relationship
User.hasMany(Transaction, {
  foreignKey: "supplyerId",
  as: "transactions",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Transaction.belongsTo(Supplyer, {
  foreignKey: "supplyerId",
  as: "supplier",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export {
  User,
  MgmtEmp,
  NomalEmp,
  Supplyer,
  Department,
  Order,
  OrderItem,
  FoodItem,
  Feedback,
  Transaction,
  OrderSummary,
};
