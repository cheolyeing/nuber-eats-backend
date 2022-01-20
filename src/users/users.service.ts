import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    // check new user
    // create user & hash the password
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // already exists
        // make error
        return false;
      }

      await this.users.save(this.users.create({ email, password, role }));
      return true;
    } catch (e) {
      // make error
      console.log(e);
    }
  }
}
