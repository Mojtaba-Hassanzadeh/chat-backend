export class FindOneRoleQuery {
  constructor(
    public readonly filter: any,
    public readonly fields?: string[],
    public readonly options?: any,
  ) {}
}
