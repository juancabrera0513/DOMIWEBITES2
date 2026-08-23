import emailjs from "@emailjs/browser";
import {
  buildAuditEmailParams,
  normalizeWebsite,
  sendAuditRequest,
} from "../lib/auditRequest";

jest.mock("@emailjs/browser", () => ({
  __esModule: true,
  default: { send: jest.fn(() => Promise.resolve()) },
}));

const request = {
  name: "  Test Owner  ",
  email: " owner@example.com ",
  website: "www.example.com/services",
  message: "  Improve local visibility.  ",
};

describe("audit request delivery", () => {
  beforeEach(() => {
    emailjs.send.mockClear();
  });

  test("normalizes valid website addresses and rejects invalid ones", () => {
    expect(normalizeWebsite("example.com")).toBe("https://example.com/");
    expect(normalizeWebsite("https://example.com/path")).toBe("https://example.com/path");
    expect(normalizeWebsite("not a website")).toBe("");
    expect(normalizeWebsite("localhost")).toBe("");
  });

  test("builds an audit-specific message for the existing contact template", () => {
    expect(buildAuditEmailParams(request)).toEqual({
      fullName: "Test Owner",
      email: "owner@example.com",
      phone: "",
      subject: "Free website audit request: example.com",
      message: "Website: https://www.example.com/services\n\nWhat they would like to improve:\nImprove local visibility.",
      reply_to: "owner@example.com",
      website_url: "https://www.example.com/services",
    });
  });

  test("sends the request through EmailJS", async () => {
    await sendAuditRequest(request);

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send.mock.calls[0][2]).toMatchObject({
      fullName: "Test Owner",
      reply_to: "owner@example.com",
      website_url: "https://www.example.com/services",
    });
  });
});
