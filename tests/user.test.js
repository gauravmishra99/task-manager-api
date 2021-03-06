const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const {userOneId,userOne,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Gaurav",
      email: "gauravmishra.190699@gmail.com",
      password: "Gaurav@123!",
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Gaurav",
      email: "gauravmishra.190699@gmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("Gaurav@123!");
});

test("Should Login Existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(res.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "lalalala@123!",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should Delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthorized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Aniket",
    })
    .expect(200);

  const user = await User.findById(userOneId)
  expect(user.name).toBe('Aniket')
});

test("Should not update invalid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'New Delhi'
    })
    .expect(400)
});