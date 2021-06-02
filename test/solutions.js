let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('Solutions APIs', () => {
    it("Sample test for circleci", (done) => {
        done();
    });
})