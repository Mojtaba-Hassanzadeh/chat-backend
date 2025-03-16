export class FindManyMessageQuery {
  constructor(
    public readonly filter: any,
    public readonly projection?: any,
    public readonly options?: any,
  ) {}
}
