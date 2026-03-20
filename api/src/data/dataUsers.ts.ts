import argon2 from "argon2";

export async function getUsersData() {
  return [
    {
      username: "cedric",
      email: "ced.campagne@gmail.com",
      password: await argon2.hash("Azerty1234"),
      is_active: true
    }
    // {
    //   username: "marc",
    //   email: "marc@example.com",
    //   password: await argon2.hash("Azerty1234"),
    //   is_active: true
    // },
    // {
    //   username: "lea",
    //   email: "lea@example.com",
    //   password: await argon2.hash("Azerty1234"),
    //   is_active: true
    // },
    // {
    //   username: "sophie",
    //   email: "sophie@example.com",
    //   password: await argon2.hash("Azerty1234"),
    //   is_active: true
    // },
    // {
    //   username: "antoine",
    //   email: "antoine@example.com",
    //   password: await argon2.hash("Azerty1234"),
    //   is_active: true
    // }
  ];
}
