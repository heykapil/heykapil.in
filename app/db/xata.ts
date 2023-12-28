// Generated by Xata Codegen 0.28.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "views",
    columns: [
      { name: "count", type: "int", notNull: true, defaultValue: "0" },
      { name: "slug", type: "string", unique: true },
    ],
  },
  {
    name: "guestbook",
    columns: [
      {
        name: "email",
        type: "string",
        notNull: true,
        defaultValue: "user@example.com",
      },
      {
        name: "body",
        type: "string",
        notNull: true,
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adip",
      },
      {
        name: "created_by",
        type: "string",
        notNull: true,
        defaultValue: "User Name",
      },
      {
        name: "image",
        type: "string",
        notNull: true,
        defaultValue: "https://cdn.kapil.app",
      },
      {
        name: "created_at",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      {
        name: "updated_at",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
    ],
  },
  {
    name: "redirects",
    columns: [
      { name: "source", type: "string" },
      {
        name: "destination",
        type: "string",
        notNull: true,
        defaultValue: "https://cdn.kapil.app",
      },
      { name: "permanent", type: "bool", notNull: true, defaultValue: "false" },
    ],
  },
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "nextauth_accounts" },
      { column: "user", table: "nextauth_users_accounts" },
      { column: "user", table: "nextauth_users_sessions" },
      { column: "user", table: "nextauth_sessions" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "nextauth_users_accounts" }],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
    revLinks: [{ column: "session", table: "nextauth_users_sessions" }],
  },
  {
    name: "images_rows",
    columns: [
      { name: "created_at", type: "datetime" },
      { name: "href", type: "string" },
      { name: "username", type: "string" },
      { name: "imageSrc", type: "string" },
      { name: "name", type: "string" },
    ],
  },
  {
    name: "uploads",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "Name" },
      {
        name: "url",
        type: "string",
        notNull: true,
        defaultValue: "https://cdn.kapil.app",
      },
      { name: "uploaded_at", type: "text", notNull: true, defaultValue: "now" },
      { name: "size", type: "int" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Views = InferredTypes["views"];
export type ViewsRecord = Views & XataRecord;

export type Guestbook = InferredTypes["guestbook"];
export type GuestbookRecord = Guestbook & XataRecord;

export type Redirects = InferredTypes["redirects"];
export type RedirectsRecord = Redirects & XataRecord;

export type NextauthUsers = InferredTypes["nextauth_users"];
export type NextauthUsersRecord = NextauthUsers & XataRecord;

export type NextauthAccounts = InferredTypes["nextauth_accounts"];
export type NextauthAccountsRecord = NextauthAccounts & XataRecord;

export type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export type NextauthVerificationTokensRecord = NextauthVerificationTokens &
  XataRecord;

export type NextauthUsersAccounts = InferredTypes["nextauth_users_accounts"];
export type NextauthUsersAccountsRecord = NextauthUsersAccounts & XataRecord;

export type NextauthUsersSessions = InferredTypes["nextauth_users_sessions"];
export type NextauthUsersSessionsRecord = NextauthUsersSessions & XataRecord;

export type NextauthSessions = InferredTypes["nextauth_sessions"];
export type NextauthSessionsRecord = NextauthSessions & XataRecord;

export type ImagesRows = InferredTypes["images_rows"];
export type ImagesRowsRecord = ImagesRows & XataRecord;

export type Uploads = InferredTypes["uploads"];
export type UploadsRecord = Uploads & XataRecord;

export type DatabaseSchema = {
  views: ViewsRecord;
  guestbook: GuestbookRecord;
  redirects: RedirectsRecord;
  nextauth_users: NextauthUsersRecord;
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_sessions: NextauthSessionsRecord;
  images_rows: ImagesRowsRecord;
  uploads: UploadsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Kapil-Chaudhary-s-workspace-kmmi3f.ap-southeast-2.xata.sh/db/kapil",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
