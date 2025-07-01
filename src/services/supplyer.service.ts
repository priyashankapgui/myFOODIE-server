import Supplyer from "../models/supplyer";

export const createSupplyer = async (data: any) => {
  return await Supplyer.create(data);
};

export const getAllSupplyers = async () => {
  return await Supplyer.findAll();
};

export const getSupplyerById = async (id: number) => {
  return await Supplyer.findByPk(id);
};

export const updateSupplyer = async (id: number, data: any) => {
  const supplyer = await Supplyer.findByPk(id);
  if (!supplyer) return null;
  await supplyer.update(data);
  return supplyer;
};

export const deleteSupplyer = async (id: number) => {
  const supplyer = await Supplyer.findByPk(id);
  if (!supplyer) return null;
  await supplyer.destroy();
  return true;
};
