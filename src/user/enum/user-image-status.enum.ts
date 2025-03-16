import { registerEnumType } from '@nestjs/graphql';
export enum UserImageStatusEnum {
  DRAFT = 'draft',
  PUBLISH = 'publish',
}

registerEnumType(UserImageStatusEnum, {
  name: 'UserImageStatusEnum',
});
