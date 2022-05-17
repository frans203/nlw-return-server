import { SubmitFeedbackUsecase } from "./submit-feedback-use-case";

//spies
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUsecase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit Feedback", () => {
  it("Should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64WJIQJSDIQWJDO",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("Shoulb not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64WJIQJSDIQWJDO",
      })
    ).rejects.toThrow();
  });

  it("Shoulb not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64WJIQJSDIQWJDO",
      })
    ).rejects.toThrow();
  });

  it("Shoulb not be able to submit feedback with a screenshot of a different format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "bugged",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
