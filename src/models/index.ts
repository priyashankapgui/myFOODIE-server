import User from "./user";
import MgmtEmp from "./mgmtEmp";
import NomalEmp from "./nomalEmp";
import Supplyer from "./supplyer";
import Department from "./department";
import Order from "./order";
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
User.hasOne(NomalEmp, {
  foreignKey: "userId",
  as: "normalEmployee",
});
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

//user and feedback are one to many relationship
User.hasMany(Feedback, { foreignKey: "userId", as: "feedbacks" });
Feedback.belongsTo(User, { foreignKey: "userId", as: "user" });

//foodItem and feedback are one to many relationship
FoodItem.hasMany(Feedback, { foreignKey: "foodId", as: "feedbacks" });
Feedback.belongsTo(FoodItem, { foreignKey: "foodId", as: "foodItem" });

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
  FoodItem,
  Feedback,
  Transaction,
};
