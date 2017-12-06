//app.spec.js
let Request = require('request');
describe("server", () => {
    let server;
    let surveyId;
    beforeAll(() => {
        server = require('../app');
    });
    describe("POST /API/surveys", () => {
        let data = {};
        beforeAll((done) => {
            Request({
                method: 'POST',
                uri: 'http://localhost:3000/API/surveys',
                json: true,
                body: {
                    "vraag": "vind jij aardappelen cool?",
                    "antwoord1": "ja",
                    "antwoord2": "nee"
                }
            }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check survey body", () => {
            expect(data.body.vraag).toBe("vind jij aardappelen cool?");
            expect(data.body.antwoord1).toBe("ja");
            expect(data.body.antwoord2).toBe("nee");
            expect(data.body._id).toBeDefined();
            surveyId = data.body._id;
        });
        describe("GET /API/surveys", () => {
            let data = {};
            beforeAll((done) => {
                Request.get('http://localhost:3000/API/surveys', (error, response,
                    body) => {
                    data.status = response.statusCode;
                    data.body = JSON.parse(body);
                    done();
                }).auth(null, null, true, process.env.VALID_TOKEN);
            });
            it("status 200", () => {
                expect(data.status).toBe(200);
            });
        });
        describe("DELETE /API/survey/:id", () => {
            let data = {};
            beforeAll((done) => {
                Request.delete('http://localhost:3000/API/survey/' + surveyId, (error,
                    response, body) => {
                    data.status = response.statusCode;
                    data.body = body;
                    done();
                }).auth(null, null, true, process.env.VALID_TOKEN);
            });
            it("status 200", () => {
                expect(data.status).toBe(200);
            });
        });
    });
});