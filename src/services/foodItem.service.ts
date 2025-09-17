import FoodItem from "../models/foodItem";
import Supplier from "../models/supplier";
import NomalEmp from "../models/nomal-employee";
import MgmtEmp from "../models/management-employee";
import User from "../models/user";

// Create a new food item
export const createFoodItem = async (data: any) => {
  return await FoodItem.create(data);
};

// Get all food items
export const getAllFoodItems = async () => {
  return await FoodItem.findAll();
};

// Get food items by supplier ID
export const getFoodItemsBySupplierId = async (supplierId: string) => {
  return await FoodItem.findAll({
    where: { supplierId },
  });
};

// Get a food item by ID
export const getFoodItemById = async (id: number) => {
  const foodItem: any = await FoodItem.findByPk(id, {
    include: [
      {
        model: Supplier,
        as: "supplier",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });

  if (!foodItem) return null;

  return {
    ...foodItem,
    supplierName: foodItem.supplier?.user?.name,
  };
};

//Get Food items  by  avaliabality is true ,  foodType and  time
export const getAvailableFoodItemsByTime = async () => {
  try {
    const currentHour = new Date().getHours();
    let mealType: string;

    // Determine meal type based on current time
    // if (
    //   (currentHour >= 21 && currentHour <= 23) ||
    //   (currentHour >= 0 && currentHour < 1)
    // ) {
    //   mealType = "breakfast";
    //   //? Breakfast → 9:00 PM (21) to 1:00 AM (01)
    // } else if (currentHour >= 6 && currentHour < 9) {
    //   mealType = "lunch";
    //   //? Lunch → 6:00 AM (06) to 9:00 AM (09)
    // } else if (currentHour >= 11 && currentHour < 15) {
    //   mealType = "dinner";
    //   //? Dinner → 11:00 AM (11) to 3:00 PM (15)
    // } else if (currentHour >= 18 && currentHour < 20) {
    //   mealType = "snacks";
    //   //? Snacks → 6:00 PM (18) to 8:00 PM (20)
    // } else {
    //   mealType = "beverages";
    //   //? Beverages → All other times
    // }

    mealType = "breakfast";

    console.log(`Current hour: ${currentHour}, Serving: ${mealType}`);

    const foodItems = await FoodItem.findAll({
      where: {
        available: true,
      },
      include: [
        {
          model: Supplier,
          as: "supplier",
          where: {
            foodType: mealType,
          },
          attributes: ["id", "foodType"],
        },
      ],
      order: [["name", "ASC"]],
    });

    return foodItems;
  } catch (error) {
    console.error("Error fetching food items by time:", error);
    throw error;
  }
};
//NOTE: Get Food Items by Time logic
//* Check the availability of food items based on meal type and time
//* First I will get the current hour and determine the meal type
//* Next I will fetch the available food items based on the meal type

// Update a food item by ID
export const updateFoodItem = async (id: number, data: any) => {
  const foodItem = await FoodItem.findByPk(id);
  if (!foodItem) return null;

  //Remove the pricing information in the update
  delete data.price;
  delete data.employeeprice;
  delete data.hospitalprice;

  await foodItem.update(data);
  return foodItem;
};

// Delete a food item by ID
export const deleteFoodItem = async (id: number) => {
  console.log("Deleting food item with ID:", id);
  const foodItem = await FoodItem.findByPk(id);
  if (!foodItem) return null;
  await foodItem.destroy();
  return true;
};

export const getDepartmentUserNamesByDepartmentId = async (
  departmentId: number
) => {
  try {
    const mgmtUsers: any[] = await MgmtEmp.findAll({
      where: { departmentId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
      raw: true,
      nest: true,
    });

    const normalUsers: any[] = await NomalEmp.findAll({
      where: { departmentId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
      raw: true,
      nest: true,
    });

    // Extract only userId and name from both employee types
    const allUsers = [
      ...mgmtUsers.map((e) => ({
        id: e.user?.id,
        name: e.user?.name,
      })),
      ...normalUsers.map((e) => ({
        id: e.user?.id,
        name: e.user?.name,
      })),
    ].filter((u) => u.id && u.name); // remove null/undefined

    return { departmentId, users: allUsers };
  } catch (error) {
    console.error("Error fetching department users:", error);
    throw error;
  }
};
