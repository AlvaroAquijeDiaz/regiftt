import { NextResponse } from "next/server";
import { type TallyWebhookPayload } from "~/server/tally.types";

export const POST = async (req: Request) => {
  const ACCEPT_TO_RECEIVE_EMAILS_QUESTION_ID =
    "question_lbBGqX_283184d4-d706-4a36-9cff-534359027687";
  const EMAIL_QUESTION_ID = "question_dWEMNV";
  const body = (await req.json()) as TallyWebhookPayload;

  const acceptedToReceiveEmails = body.data.fields.find(
    (f) => f.type === "CHECKBOXES" && f.key === ACCEPT_TO_RECEIVE_EMAILS_QUESTION_ID
  );

  const emailToSend = body.data.fields.find(
    (f) => f.type === "INPUT_EMAIL" && f.key === EMAIL_QUESTION_ID
  );

  return NextResponse.json({
    success: true,
    emailSent: acceptedToReceiveEmails?.value || "NOT_FOUND",
    sentTo: emailToSend?.value,
  });
};
