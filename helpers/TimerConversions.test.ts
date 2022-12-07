import { secondsToTimer, timerToSeconds } from "./TimerConversions";

describe("Time tests", () => {
  test("convert seconds into timer format", () => {
    expect(secondsToTimer(600)).toBe("10:00");
  });
  test("convert timer format into seconds ", () => {
    expect(timerToSeconds("10:00")).toBe(600);
  });
});
