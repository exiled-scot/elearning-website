import { BASE_URL } from '../api';
import PocketBase from 'pocketbase';

const pb = new PocketBase(BASE_URL);

export class User {
  constructor(id, username, email, name, enrolled) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.enrolled = enrolled;
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

  getEnrolled() {
    return this.enrolled;
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

  setEnrolled(enrolled) {
    this.enrolled = enrolled;
  }

  static async retrieveDataFromAPI(RECORD_ID) { /* Modified method to be static */
    try {
      const record = await pb.collection('users').getOne(RECORD_ID, {
        expand: 'id,username,email,name,avatar,enrolled,created,updated',
      });

      // Create new User object and return it
      return new User(record.id, record.username, record.email, record.name, record.enrolled);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
