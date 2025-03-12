export class SigninWithOtpQuery {
  constructor(
    public readonly phone: string,
    public readonly email: string,
  ) {}
}
