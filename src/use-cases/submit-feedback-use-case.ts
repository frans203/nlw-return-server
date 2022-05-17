import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUsecaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUsecase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUsecaseRequest) {
    const { type, comment, screenshot } = request;
    if (!type) {
      throw new Error("Type is required");
    }
    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New Feedback",
      body: [
        `<div>`,
        `<p>Feedback: ${type}</p>`,
        `<p>comment: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
