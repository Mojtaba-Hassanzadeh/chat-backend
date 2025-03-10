export class FindPermissionOneItemByNameQuery {
  constructor(
    readonly name: string,
    readonly id: string | null,
  ) {}
}
