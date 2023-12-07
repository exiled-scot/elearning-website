import { BASE_URL } from '../api';
import PocketBase from 'pocketbase';
import { getUserId } from '../../utils/auth';

const pb = new PocketBase(BASE_URL);

export class User {
  constructor(id, username, email, name) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
  }

  // Getter and setter methods here

  static async retrieveDataFromAPI(RECORD_ID) {
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

export const getUserRecord = async () => {
  const userId = getUserId();

  try {
    const record = await pb.collection('users').getOne(userId, {
      expand: 'id,username,email,name,avatar,created,updated',
    });

    // Create new User object and return it
    return new User(record.id, record.username, record.email, record.name);
  } catch (error) {
    console.error('Error retrieving user record:', error);
    // Handle the error accordingly
  }
};

export default User;
