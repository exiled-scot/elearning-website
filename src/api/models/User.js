import { BASE_URL } from '../api';
import PocketBase from 'pocketbase';

const pb = new PocketBase(BASE_URL);

export class User {
  constructor(id, username, email, name) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
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

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }

  static async retrieveDataFromAPI(RECORD_ID) { /* Modified method to be static */
    try {
      const record = await pb.collection('users').getOne(RECORD_ID, {
        expand: 'id,username,email,name,avatar,created,updated',
      });

      // Create new User object and return it
      return new User(record.id, record.username, record.email, record.name);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
