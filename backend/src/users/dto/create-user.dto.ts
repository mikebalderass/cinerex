import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsEmail, IsIn, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateUserDto  {
  @ApiProperty()
  @IsUUID("4")
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  userName: string;

  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsString()
  @MinLength(8) 
  userPassword: string;

  @ApiProperty({
    type: [String],
    description: "Array of user roles, e.g., 'Admin', 'Customer'",
    required: false,
  })  
  @IsArray()
  @IsIn(['Admin','Customer'], { each: true })
  userRole: string[];
}
