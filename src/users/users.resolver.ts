import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      return await this.usersService.createAccount(createAccountInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
