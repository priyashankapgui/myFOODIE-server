import User from "./user";
import MgmtEmp from "./management-employee";
import NomalEmp from "./nomal-employee";
import Supplyer from "./supplyer";
import Department from "./department";
import Order from "./order";
import OrderItem from "./orderItems";
import FoodItem from "./foodItem";
import Feedback from "./feedback";
import Transaction from "./transaction";

//mgmtEmp and nomalEmp are one to one relationship with user
User.hasOne(MgmtEmp, {
  foreignKey: "userId",
  as: "managementEmployee",
});
MgmtEmp.belongsTo(User, { foreignKey: "userId", as: "user" });

//nomalEmp and user are one to one relationship
User.hasOne(NomalEmp, { foreignKey: "userId", as: "normalEmployee" });
NomalEmp.belongsTo(User, { foreignKey: "userId", as: "user" });

//department and nomalEmp are one to many relationship
Department.hasMany(NomalEmp, {
  foreignKey: "departmentId",
  as: "normalEmployees",
});
NomalEmp.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

//supplyer and user are one to one relationship
User.hasOne(Supplyer, { foreignKey: "userId", as: "supplyer" });
Supplyer.belongsTo(User, { foreignKey: "userId", as: "user" });

//user and order are one to many relationship
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

//supplyer and foodItem are one to many relationship
Supplyer.hasMany(FoodItem, { foreignKey: "supplierId", as: "foodItems" });
FoodItem.belongsTo(Supplyer, { foreignKey: "supplierId", as: "supplier" });

//order and foodItem are many to one relationship
FoodItem.hasMany(Order, { foreignKey: "foodId", as: "orders" });
Order.belongsTo(FoodItem, { foreignKey: "foodId", as: "foodItem" });

//order and employee are one to one relationship
Order.hasOne(NomalEmp, { foreignKey: "employeeId", as: "employee" });
NomalEmp.belongsTo(Order, { foreignKey: "employeeId", as: "order" });

//order and orderItem are one to many relationship
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

//foodItem and orderItem are one to many relationship
FoodItem.hasMany(OrderItem, { foreignKey: "foodItemId", as: "orderItems" });
OrderItem.belongsTo(FoodItem, { foreignKey: "foodItemId", as: "foodItem" });

//employee and orderItem are one to many relationship
NomalEmp.hasMany(OrderItem, { foreignKey: "employeeId", as: "orderItems" });
OrderItem.belongsTo(NomalEmp, { foreignKey: "employeeId", as: "employee" });

//user and feedback are one to many relationship
User.hasMany(Feedback, { foreignKey: "userId", as: "feedbacks" });
Feedback.belongsTo(User, { foreignKey: "userId", as: "user" });

//supplyer and feedback are one to many relationship
Supplyer.hasMany(Feedback, { foreignKey: "supplierId", as: "feedbacks" });
Feedback.belongsTo(Supplyer, { foreignKey: "supplierId", as: "supplier" });

//user and transaction are one to many relationship
User.hasMany(Transaction, { foreignKey: "supplyerId", as: "transactions" });
Transaction.belongsTo(Supplyer, { foreignKey: "supplyerId", as: "supplier" });

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
};
