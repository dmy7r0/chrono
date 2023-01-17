import dayjs from "dayjs";
import { testSingleCase } from "../test_util";

// Business days definitions
const holidays = "2023-01-01, 2023-01-02, 2023-05-29, 2023-07-04, 2023-09-04, 2023-11-23, 2023-12-25".split(", ");
const testDate = dayjs("2023-01-13 17:30").toDate();

import * as chrono from "../../src";

chrono.setBusinessHoursAndHolidays(undefined, holidays);

test("Test - in X business day", function () {
    testSingleCase(chrono.casual, "in one business day", testDate, (result) => {
        expect(result.text).toBe("in one business day");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(16);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 16, 17, 30));
    });
});

test("Test - in next 2 business days", function () {
    testSingleCase(chrono.casual, "in next 2 business days", testDate, (result) => {
        expect(result.text).toBe("next 2 business days");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 17, 17, 30));
    });
});

test("Test - in X business days", function () {
    testSingleCase(chrono.casual, "in 5 business days", testDate, (result) => {
        expect(result.text).toBe("in 5 business days");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(20);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(30);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 20, 17, 30));
    });
});

test("Test - X business days after Y", function () {
    testSingleCase(chrono.casual, "5 business days after 24 October 2023", testDate, (result) => {
        // expect(result.index).toBe(0);
        expect(result.text).toBe("5 business days after 24 October 2023");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(31);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 10 - 1, 31, 12, 0));
    });
});

test("Test - X business days before Y", function () {
    testSingleCase(chrono.casual, "5 business days before 24 October 2023", testDate, (result) => {
        expect(result.text).toBe("5 business days before 24 October 2023");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 10 - 1, 17, 12, 0));
    });
});

test("Test - X business days after Y", function () {
    testSingleCase(chrono.casual, "3 business days after next Friday", testDate, (result) => {
        // expect(result.index).toBe(0);
        expect(result.text).toBe("3 business days after next Friday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(25);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 25, 12, 0));
    });
});

test("Test - in X business days if the current day is a holiday", function () {
    testSingleCase(chrono.casual, "in two business days", dayjs("2023-01-02 10:00").toDate(), (result) => {
        expect(result.text).toBe("in two business days");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 4, 10, 0));
    });
});

test("Test - casual range (X - Y)", function () {
    testSingleCase(chrono.casual, "The Deadline is today 5PM - next business day", testDate, (result) => {
        expect(result.text).toBe("today 5PM - next business day");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2023, 1 - 1, 13, 17, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(1);
        expect(result.end.get("day")).toBe(16);
        expect(result.end.get("hour")).toBe(17);
        expect(result.end.get("minute")).toBe(30);

        expect(result.end.isCertain("day")).toBe(true);
        expect(result.end.isCertain("month")).toBe(true);
        expect(result.end.isCertain("year")).toBe(true);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);

        expect(result.end).toBeDate(new Date(2023, 1 - 1, 16, 17, 30));
    });
});

test("Test - casual range (from X to Y)", function () {
    testSingleCase(
        chrono.casual,
        "From tomorrow to next 5 business days",
        dayjs("2023-01-12 09:30").toDate(),
        (result) => {
            expect(result.text).toBe("tomorrow to next 5 business days");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2023);
            expect(result.start.get("month")).toBe(1);
            expect(result.start.get("day")).toBe(13);
            expect(result.start.get("hour")).toBe(9);
            expect(result.start.get("minute")).toBe(30);

            expect(result.start.isCertain("day")).toBe(true);
            expect(result.start.isCertain("month")).toBe(true);
            expect(result.start.isCertain("year")).toBe(true);
            expect(result.start.isCertain("hour")).toBe(true);
            expect(result.start.isCertain("minute")).toBe(true);

            expect(result.start).toBeDate(new Date(2023, 1 - 1, 13, 9, 30));

            expect(result.end).not.toBeNull();
            expect(result.end.get("year")).toBe(2023);
            expect(result.end.get("month")).toBe(1);
            expect(result.end.get("day")).toBe(19);
            expect(result.end.get("hour")).toBe(9);
            expect(result.end.get("minute")).toBe(30);

            expect(result.end.isCertain("day")).toBe(true);
            expect(result.end.isCertain("month")).toBe(true);
            expect(result.end.isCertain("year")).toBe(true);
            expect(result.end.isCertain("hour")).toBe(true);
            expect(result.end.isCertain("minute")).toBe(true);

            expect(result.end).toBeDate(new Date(2023, 1 - 1, 19, 9, 30));
        }
    );
});
