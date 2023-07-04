const mongoose = require("mongoose");
require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
    it("has an email address", () => {
        const user = new User({
        firstName: "Test",
        lastName: "Test",
        email: "test@test.com",
        password: "password1",
        });
        expect(user.email).toEqual("test@test.com");
    });

    it("has a password", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "test@test.com",
            password: "password1",
        });
        expect(user.password).toEqual("password1");
    });
})  