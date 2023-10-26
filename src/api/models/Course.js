import { BASE_URL } from '../api';

export class Course {
  constructor(categories, collectionName, content, courseContent, created, description, id, image, instructor, requirements, reviews, title) {
    this.categories = categories;
    this.collectionName = collectionName;
    this.content = content;
    this.courseContent = courseContent;
    this.created = created;
    this.description = description;
    this.id = id;
    this.image = image;
    this.instructor = instructor;
    this.requirements = requirements;
    this.reviews = reviews;
    this.title = title;
  }

  async populateDataFromAPI(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}/api/collections/${endpoint}/records?perPage=100`);
      const data = await response.json();
      const courseData = data.items[0];
      this.categories = courseData.categories;
      this.collectionName = courseData.collectionName;
      this.content = courseData.content;
      this.courseContent = courseData.courseContent;
      this.created = courseData.created;
      this.description = courseData.description;
      this.id = courseData.id;
      this.image = courseData.image;
      this.instructor = courseData.instructor;
      this.requirements = courseData.requirements;
      this.reviews = courseData.reviews;
      this.title = courseData.title;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Course;
