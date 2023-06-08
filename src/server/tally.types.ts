export interface TallyWebhookPayload {
  eventId: string;
  createdAt: Date;
  data: Data;
}

export interface Data {
  responseId: string;
  submissionId: string;
  respondentId: string;
  formId: string;
  formName: string;
  createdAt: Date;
  fields: Field[];
}

export interface Field {
  key: string;
  label: string;
  type: "INPUT_TEXT" | "MULTI_SELECT" | "CHECKBOXES" | "INPUT_EMAIL" | "DROPDOWN";
  value: string[] | boolean | null | string;
  options?: Option[];
}

export interface Option {
  id: string;
  text: string;
}
