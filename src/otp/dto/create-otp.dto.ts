import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { OtpEntity } from '../entity/otp.entity';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class CreateOtpInput extends PickType(OtpEntity, [
  'phone',
  'email',
  'code',
] as const) {}

@ObjectType()
export class CreateOtpOutput extends CoreOutput {}
