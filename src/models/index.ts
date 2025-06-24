import User from "./user";
import MgmtEmp from "./mgmtEmp";
import NomalEmp from "./nomalEmp";
import Supplyer from "./supplyer";
import Department from "./department";

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

export { User, MgmtEmp, NomalEmp, Supplyer, Department };
