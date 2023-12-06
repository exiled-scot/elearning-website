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

  // Getter and setter methods here

  async populateDataFromAPI(RECORD_ID) {
  try {
    const record = await pb.collection('users').getOne(RECORD_ID, {
      expand: 'id,username,email,name,avatar,created,updated',
    });

    // Assign the fetched data to the User object
    this.id = record.id;
    this.username = record.username;
    this.email = record.email;
    this.name = record.name;
  } catch (error) {
    console.log(error);
  }
}
}

export default User
