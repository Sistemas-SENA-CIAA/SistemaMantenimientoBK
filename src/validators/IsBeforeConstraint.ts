import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from "class-validator";
  
  @ValidatorConstraint({ async: false })
  class IsBeforeConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: any, args: ValidationArguments) {
      if (!(propertyValue instanceof Date)) {
        propertyValue = new Date(propertyValue);
      }
  
      let relatedValue = (args.object as any)[args.constraints[0]];
  
      if (!(relatedValue instanceof Date)) {
        relatedValue = new Date(relatedValue);
      }
  
      return propertyValue < relatedValue;
    }
  
    defaultMessage(args: ValidationArguments) {
      return `La fecha ${args.property} debe ser anterior a ${args.constraints[0]}`;
    }
  }
  
  export function IsBefore(
    property: string,
    validationOptions?: ValidationOptions
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        validator: IsBeforeConstraint,
      });
    };
  }
  