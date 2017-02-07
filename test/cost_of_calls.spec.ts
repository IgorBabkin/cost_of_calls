import { expect } from "chai";
import cost_of_calls from "../src/cost_of_calls";

describe("cost_of_calls", () => {

    it("should pay 3 cents for every started second of the call if call was shorter than 5 minutes", () => {
        expect(cost_of_calls("00:01:07,400-234-090")).to.equal(201);
    });

    it("should pay 150 cents for every started minute of the call if call was at least 5 minutes long", () => {
        expect(cost_of_calls("00:05:00,400-234-090")).to.equal(750);
        expect(cost_of_calls("00:05:01,400-234-090")).to.equal(900);
    });

    it("should apply free promotion for all calls to the phone number that has the longest total duration of calls", () => {
        const logs =
            "00:01:07,400-234-090" + "\n" +
            "00:05:01,701-080-080" + "\n" +
            "00:05:00,400-234-090";

        expect(cost_of_calls(logs)).to.equal(900);
    })

    it("should apply free promotion only to the phone number whose numeric value is smallest if more than one number shares the longest total duration", () => {
        const logs =
            "00:01:07,400-234-012" + "\n" +
            "00:01:07,400-234-090" + "\n" +
            "00:01:07,101-080-080" + "\n" +
            "00:04:00,101-080-080" + "\n" +
            "00:04:00,400-234-090";

        expect(cost_of_calls(logs)).to.equal(1101);
    })    

});
