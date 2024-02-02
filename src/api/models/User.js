import { BASE_URL } from "../api";
import PocketBase from "pocketbase";

const pb = new PocketBase(BASE_URL);

export class User {
  constructor(
    id,
    username,
    email,
    name,
    saved_courses,
    completed_courses,
    purchased_courses,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.saved_courses = saved_courses;
    this.completed_courses = completed_courses;
    this.purchased_courses = purchased_courses;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getName() {
    return this.name;
  }

  getSavedCourses() {
    return this.saved_courses;
  }

  getCompletedCourses() {
    return this.completed_courses;
  }

  getPurchasedCourses() {
    return this.purchased_courses;
  }

  setSavedCourses(saved_courses) {
    this.saved_courses = saved_courses;
  }

  setCompletedCourses(completed_courses) {
    this.completed_courses = completed_courses;
  }

  setPurchasedCourses(purchased_courses) {
    this.purchased_courses = purchased_courses;
  }
  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }

  static async retrieveDataFromAPI(RECORD_ID) {
    /* Modified method to be static */
    try {
      const record = await pb.collection("users").getOne(RECORD_ID, {
        expand:
          "id,username,email,name,avatar,saved_courses,completed_courses,created,updated",
      });

      // Create new User object and return it
      return new User(record.id, record.username, record.email, record.name);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
