import { PATTERNS, generateRandomDate, getRandomItem } from "lib";
import { TImage } from "schemas/courses";
import { TotalCourse } from "schemas/courses";

function generateMockImages(): TImage[] {
  const startDate = new Date("2023-01-01T00:00:00Z");
  const endDate = new Date(); // Date actuelle

  const mockImages: TImage[] = [];

  for (let i = 1; i <= 20; i++) {
    const newImage: TImage = {
      id: `image${i}`,
      alt: "",
      updatedAt: generateRandomDate(startDate, endDate),
      createdAt: generateRandomDate(startDate, endDate),
      image:
        process.env.DIRECTORY_IMAGES +
        `patterns/${getRandomItem(PATTERNS)}.svg`,
    };

    mockImages.push(newImage);
  }

  return mockImages;
}
function generateMockCourses(): TotalCourse[] {
  const startDate = new Date("2023-01-01T00:00:00Z");
  const endDate = new Date(); // Date actuelle

  const mockCourses: TotalCourse[] = [];

  for (let i = 1; i <= 20; i++) {
    const newCourse: TotalCourse = {
      id: `course${i}`,
      userId: `user${i}`,
      title: `Course ${i}`,
      description: `Description for Course ${i}`,
      status: "ACTIVE",
      type: "CLASSIC",
      folderId: "course",
      authorId: "author",
      author: {
        id: `author${i}`,
        updatedAt: generateRandomDate(startDate, endDate),
        createdAt: generateRandomDate(startDate, endDate),
        role: "TEACHER",
        name: `author${i}`,
        image:
          process.env.DIRECTORY_IMAGES +
          `patterns/${getRandomItem(PATTERNS)}.svg`,
      },
      updatedAt: generateRandomDate(startDate, endDate),
      createdAt: generateRandomDate(startDate, endDate),
      imageId: `image${i}`,
      folder: {
        id: `folder${i}`,
        updatedAt: generateRandomDate(startDate, endDate),
        createdAt: generateRandomDate(startDate, endDate),
        userId: `User${i}`,
        name: `Folder${i}`,
      },
      image: {
        id: `image${i}`,
        alt: "",
        updatedAt: generateRandomDate(startDate, endDate),
        createdAt: generateRandomDate(startDate, endDate),
        image:
          process.env.DIRECTORY_IMAGES +
          `patterns/${getRandomItem(PATTERNS)}.svg`,
      },
    };

    mockCourses.push(newCourse);
  }

  return mockCourses;
}

export const MOCK_COURSE: TotalCourse[] = generateMockCourses();
export const MOCK_IMAGE: TImage[] = generateMockImages();
