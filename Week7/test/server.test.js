const expect = require("chai").expect;
const request = require("request");

describe("User API Tests", function () {
    const baseUrl = "http://localhost:3000";
    
    it("returns status 200 to check if api works", function (done) {
        request(baseUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should create a new user with valid data", function (done) {
        const userData = {
            first_name: "John",
            last_name: "Doe",
            password: "password123",
            email: "john.doe@example.com"
        };
        
        request.post({
            url: `${baseUrl}/api/users`,
            json: userData
        }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.statusCode).to.equal(200);
            expect(body.message).to.include("successfully");
            done();
        });
    });

    it("should return error for missing required fields", function (done) {
        const userData = {
            last_name: "Doe", // error
            password: "password123",
            email: "test@example.com"
        };
        
        request.post({
            url: `${baseUrl}/api/users`,
            json: userData
        }, function (error, response, body) {
            expect(response.statusCode).to.not.equal(200);
            done();
        });
    });

    it("should return error for invalid email format", function (done) {
        const userData = {
            first_name: "Jane",
            last_name: "Doe",
            password: "password123",
            email: "invalid-email" // error
        };
        
        request.post({
            url: `${baseUrl}/api/users`,
            json: userData
        }, function (error, response, body) {
            expect(response.statusCode).to.not.equal(200);
            done();
        });
    });
});