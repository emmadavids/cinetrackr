const mongoose = require("mongoose");
require("../mongodb_helper");
const User = require("../../models/user");
const validator = require("../../src/validator");

describe("User model", () => {
  let isCleanupExecuted = false;

  beforeEach((done) => {
    if (!isCleanupExecuted) {
      mongoose.connection.collections.users.drop(() => {
        isCleanupExecuted = true;
        done();
      });
    } else {
      done();
    }
  });

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

    it("returns invalid for empty password", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns invalid for password without numbers", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "aksfhigto",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns invalid for password without letters", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "12341234",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns valid for password with numbers, letters and 8 or more chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "password1",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual([]);
    })
    
    it("returns invalid for password with numbers, letters but less than 8 chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "pass1",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns valid for password with numbers, caps and 8 or more chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "1234ABCD",
        });
        expect(user.password).toEqual("1234ABCD");
    });

    it("returns invalid for empty password", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns invalid for password without numbers", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "aksfhigto",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns invalid for password without letters", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "12341234",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns valid for password with numbers, letters and 8 or more chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "password1",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual([]);
    })
    
    it("returns invalid for password with numbers, letters but less than 8 chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "pass1",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual(["Password is invalid: Must contain at least 8 characters, a letter and a number."]);
    })
    
    it("returns valid for password with numbers, caps and 8 or more chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "1234ABCD",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual([]);
    })
    
    it("returns valid for password with numbers, letters caps and lower with 8 or more chars", () => {
        const user = new User({
            firstName: "Test",
            lastName: "Test",
            email: "someone@example.com",
            password: "1234ABab",
        });
        const result = validator(user.firstName, user.lastName, user.email, user.password);
        expect(result).toEqual([]);
    })
})  