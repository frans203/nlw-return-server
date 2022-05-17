import express from "express";
import { SubmitFeedbackUsecase } from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mailer-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { comment, type, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUsecase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
