import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { OtpEntity } from '../entity/otp.entity';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class FindOtpByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindOtpByPhoneInput {
  @Field(() => String)
  phone: string;
}

@ObjectType()
export class FindOtpOutput extends CoreOutput {
  @Field(() => OtpEntity, { nullable: true })
  result?: OtpEntity;
}
