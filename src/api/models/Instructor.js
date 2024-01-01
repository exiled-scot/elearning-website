import { BASE_URL } from "../api";
import PocketBase from "pocketbase";

const pb = new PocketBase(BASE_URL);

export class Instructor {
  constructor(id, name, title, about, social_media, profilePhoto) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.about = about;
    this.social_media = social_media;
    this.profilePhoto = profilePhoto;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getTitle() {
    return this.title;
  }

  getAbout() {
    return this.about;
  }

  getSocialMedia() {
    return this.social_media;
  }

  getProfilePhoto() {
    return this.profilePhoto;
  }

  setName(name) {
    this.name = name;
  }

  setTitle(title) {
    this.title = title;
  }

  setAbout(about) {
    this.about = about;
  }

  setSocialMedia(social_media) {
    this.social_media = social_media;
  }

  setProfilePhoto(profilePhoto) {
    this.profilePhoto = profilePhoto;
  }

  static async retrieveDataFromAPI(RECORD_ID) {
    try {
      const record = await pb.collection("instructors").getOne(RECORD_ID, {
        expand: "id,name,title,about,social_media,profilePhoto",
      });

      return new Instructor(
        record.id,
        record.name,
        record.title,
        record.about,
        record.social_media,
        record.profilePhoto
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default Instructor;