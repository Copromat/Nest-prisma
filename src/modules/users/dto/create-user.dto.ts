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

  password: string;
}
