const BASE_URL = "http://127.0.0.1:5002";

export const getRecords = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/api/collections/${endpoint}/records?perPage=100`);
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
