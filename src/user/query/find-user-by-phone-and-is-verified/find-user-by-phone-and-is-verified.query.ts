export class FindUserByPhoneAndIsVerifiedQuery {
  constructor(
    public readonly phone: string,
    public readonly isPasswordSelected?: boolean,
  ) {}
}
