export type AuthUser = {
  email: string;
  username: string;
  jwt: string;
};

export type SignInResponse = {
  jwt: string;
  user: {
    email: string;
    username: string;
  };
};
