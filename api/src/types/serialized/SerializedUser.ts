export type SerializedUser = Readonly<{
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  theme: string;
  timezone: string;
  startedAt: Date;
  locale: string;
  schedule: any;
  createdAt: Date;
  updatedAt: Date;
}>;
