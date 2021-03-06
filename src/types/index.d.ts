declare const wx: genericObject;

declare type genericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

declare type loginInfo = {
  token: string;
  user: genericObject;
  expiredAt: genericObject;
};

declare type populateObject = {
  field: string;
  collection: genericObject;
};
