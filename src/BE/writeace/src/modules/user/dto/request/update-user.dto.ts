import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";

export class UpdateProfileDto {

    @ApiPropertyOptional({ description: 'The email of the user', example: 'john.doe@example.com' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email?: string;

    @ApiPropertyOptional({ description: 'The password of the user', example: 'password' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

    @ApiPropertyOptional({ description: 'The avatar of the user', example: 'https://example.com/avatar.jpg' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    avatar?: string;

    @ApiPropertyOptional({ description: 'The description of the user', example: 'I am a writer' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
}

export class UpdateProfileWithFileDto extends UpdateProfileDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'The avatar file to upload' })
  avatarFile?: Express.Multer.File;
}