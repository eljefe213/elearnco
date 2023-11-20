import { prisma } from "../dist";
import type { Course } from "@prisma/client";
import { CourseStatus, CourseType, CourseMode } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

function getRandomValueFromEnum<E>(
  enumeration: { [s: string]: E } | ArrayLike<E>
): E {
  return _.sample(Object.values(enumeration)) as E;
}
/* const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})(); */

const fakerCourse = () =>
  ({
    userId: "cllp7n21t000309upoy1uppkz",
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraph(2),
    status: getRandomValueFromEnum(CourseStatus),
    mode: getRandomValueFromEnum(CourseMode),
    type: getRandomValueFromEnum(CourseType),
    imageId: "clly8933k000209lrq722cepl",
    folderId: "clly872l2000009lr3f3qm3f2",
    authorId: "clly88htq000109lrj2atevdo",
  } as Course);

async function main() {
  console.log("Seeding...");
  const courses = Array.from({ length: 100 }, fakerCourse);
  await prisma.course.createMany({ data: courses });
  console.log("Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
