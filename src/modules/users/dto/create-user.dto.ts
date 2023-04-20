export class CreateUserDto {
  firs_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  nickname: string;

  password: string;
  work?: string | null;
  skills?: string | null;
  avatar?: string | null;
}

export class LoginUser {
  nickname: string;
  access_token?: string;
  refresh_token?: string;
  password: string;
}

// {  "firs_name": "Mihail",
//   "middle_name": "Pesovich",
//   "last_name": "Petuxov",
//   "email": "Buba@mail.ru",
//   "nickname": "pochtiMiddle",

//   "password": "Cjghjvfn1998@"}
