import { IsString, MaxLength, IsArray, ArrayMinSize, IsIn } from "class-validator";
import { roles } from "../data/roles.data";
import { groups } from "../data/groups.data";

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(roles, { each: true })
  roles: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(groups, { each: true })
  groups: string[];
}