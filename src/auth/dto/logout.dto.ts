import { ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';

@ObjectType()
export class LogoutOutput extends CoreOutput {}
