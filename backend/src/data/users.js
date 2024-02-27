import bcrypt from "bcryptjs";

const users = [
  {
    name: "SamSwift",
    email: "sam@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    profileImage: "/images/avater.png",
    isAdmin: true,
  },
  {
    name: "David",
    email: "dav@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    profileImage: "/images/avater.png",
    isAdmin: false,
  },
  {
    name: "victor",
    email: "vic@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    profileImage: "/images/avater.png",
    isAdmin: false,
  },
];

export default users;
