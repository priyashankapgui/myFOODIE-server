import FoodItem from "../models/foodItem";

export const foodItemHooks = {
  beforeCreate: (item: FoodItem) => {
    item.employeeprice = item.price * 0.5;
    item.hospitalprice = item.price * 0.5;
  },
  beforeUpdate: (item: FoodItem) => {
    item.employeeprice = item.price * 0.5;
    item.hospitalprice = item.price * 0.5;
  },
};

export const foodItemAvailableHooks = {
  beforeCreate: (item: FoodItem) => {},
  beforeUpdate: (item: FoodItem) => {},
};
