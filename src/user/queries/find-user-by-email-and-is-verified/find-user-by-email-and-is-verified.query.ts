export class FindUserByEmailAndIsVerifiedQuery {
  constructor(
    public readonly email: string,
    public readonly isPasswordSelected?: boolean,
  ) {}
}
