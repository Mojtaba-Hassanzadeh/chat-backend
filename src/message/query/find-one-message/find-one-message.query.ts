export class FindOneMessageQuery {
  constructor(
    public readonly filter: any,
    public readonly fields?: string[],
    public readonly options?: any,
  ) {}
}
