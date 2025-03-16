import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserHelper } from '../helper/user-helper';
import { SIMPLE_ROLE } from 'src/role/constant/role.constant';
import { FindOneRoleQuery } from 'src/role/query/find-one-role/find-one-role.query';
import {
  UpdateUserByUserInput,
  UpdateUserOutput,
} from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserImageStatusEnum } from '../enum/user-image-status.enum';
import { UserModel } from '../model/user.model';
import { FindOneUserQuery } from '../query/find-one-user/find-one-user.query';
import { UpdateUserCommand } from '../command/update-user/update-user.command';

@Injectable()
export class UpdateUserByUserUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly helper: UserHelper,
    // private readonly uploadImageUseCase: UploadImageUseCase,
  ) {}

  async updateByUser(
    input: UpdateUserByUserInput,
    user: UserEntity,
  ): Promise<UpdateUserOutput> {
    const { email, phone, password, fileUpload } = input;
    try {
      let checkedUser: UserModel;
      if (phone) {
        checkedUser = await this.queryBus.execute(
          new FindOneUserQuery({ phone }),
        );
      }
      if (checkedUser) throw new BadRequestException('USER_ALREADY_EXISTS');

      if (email) {
        checkedUser = await this.queryBus.execute(
          new FindOneUserQuery({ email }),
        );
      }
      if (checkedUser) throw new BadRequestException('USER_ALREADY_EXISTS');

      //..................

      let isSimpleUser = false;

      const simpleRole = await this.queryBus.execute(
        new FindOneRoleQuery({ name: SIMPLE_ROLE }),
      );

      if (
        user.roles.length &&
        user.roles.length == 1 &&
        user.roles[0] == simpleRole.getId()
      ) {
        isSimpleUser = true;
      }

      const isVerificationStatusChange =
        isSimpleUser === true &&
        ((phone && user.phone !== phone) || (email && user.email !== email));

      fileUpload && (await this.helper.validateImageSize(fileUpload));
      // const uploadedImage =
      //   fileUpload &&
      //   (await this.uploadImageUseCase.uploadImage({
      //     imageFile: input.fileUpload,
      //   }));

      const hashPassword = password && (await bcrypt.hash(password, 10));

      if (hashPassword) {
        await this.commandBus.execute(
          new UpdateUserCommand({
            ...input,
            ...(isVerificationStatusChange && { isVerified: false }),
            avatarStatus: fileUpload
              ? UserImageStatusEnum.DRAFT
              : user.avatarStatus,
            password: hashPassword,
            id: user._id.toString(),
          }),
        );
      } else {
        await this.commandBus.execute(
          new UpdateUserCommand({
            ...input,
            ...(isVerificationStatusChange && { isVerified: false }),
            avatarStatus: fileUpload
              ? UserImageStatusEnum.DRAFT
              : user.avatarStatus,
            id: user._id.toString(),
          }),
        );
      }

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
