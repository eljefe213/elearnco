import { CourseStatus, CourseType, CourseMode } from "database";
import { PATTERNS, generateRandomDate, getRandomItem } from "lib";
import { TCourse, TImage } from "schemas/courses";

function generateMockImages(): TImage[] {
  const startDate = new Date("2023-01-01T00:00:00Z");
  const endDate = new Date();

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
function generateMockCourses(): TCourse[] {
  const startDate = new Date("2023-01-01T00:00:00Z");
  const endDate = new Date();

  const mockCourses: TCourse[] = [];

  for (let i = 1; i <= 20; i++) {
    const newCourse = {
      id: `course${i}`,
      userId: `user${i}`,
      title: `Course ${i}`,
      description: `Description for Course ${i}`,
      status: CourseStatus.DRAFT,
      type: CourseType.CLASSIC,
      mode: CourseMode.PRIVATE,
      folderId: "course",
      authorId: "author",

      updatedAt: generateRandomDate(startDate, endDate),
      createdAt: generateRandomDate(startDate, endDate),
      imageId: `image${i}`,

      image: `${process.env.DIRECTORY_IMAGES}patterns/${getRandomItem(
        PATTERNS
      )}.svg`,
    };

    mockCourses.push(newCourse);
  }

  return mockCourses;
}

export const MOCK_COURSE: TCourse[] = generateMockCourses();
export const MOCK_IMAGE: TImage[] = generateMockImages();
