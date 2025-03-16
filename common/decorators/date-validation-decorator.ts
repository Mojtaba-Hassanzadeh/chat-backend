/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsCorrectDateConstraint implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    const simpleDateRegExp = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    const isoDateRegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/;
    if (date.match(simpleDateRegExp) || date.match(isoDateRegExp)) {
      return true;
    }
    return false;
  }
}

export function IsCorrectDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCorrectDateConstraint,
    });
  };
}
