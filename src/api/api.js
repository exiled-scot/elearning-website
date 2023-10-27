import { Course } from './models/Course';

export const BASE_URL = "http://127.0.0.1:5002";

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

export const getRecordsByCategory = async (endpoint, category) => {
  // take the response below and turn it into an array of Courses
  // const response = await fetch(`${BASE_URL}/api/collections/${endpoint}/records?perPage=100`);
};
