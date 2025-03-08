import { Injectable } from '@nestjs/common';
import { ModelFactory } from 'common/repositories/model.factory';
import { ObjectId } from 'mongodb';
import { UserModel } from './user.model';
import { UserRepository } from '../user.repository';
import { CreateUserInput } from '../dtos/create-user.dto';

@Injectable()
export class UserModelFactory implements ModelFactory<UserModel> {
  constructor(private readonly repository: UserRepository) {}

  async create(input: CreateUserInput): Promise<UserModel> {
    const podcast = new UserModel({
      _id: new ObjectId().toHexString(),
      ...input,
    });

    await this.repository.create(podcast);
    return podcast;
  }
}
