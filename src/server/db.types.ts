import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type Gift = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  link: string | null;
  price: number | null;
  visible: Generated<number>;
  selected: Generated<number>;
  ownerId: string | null;
  selectedByUserId: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type GiftsOnLists = {
  giftId: string;
  listId: string;
};
export type List = {
  id: string;
  name: Generated<string>;
  description: string | null;
  image: string | null;
  dueOn: Generated<Timestamp>;
  visible: Generated<number>;
  ownerId: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type User = {
  id: string;
  username: string | null;
  name: string | null;
  bio: string | null;
  email: string | null;
  emailVerified: Timestamp | null;
  image: string | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Gift: Gift;
  GiftsOnLists: GiftsOnLists;
  List: List;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};
