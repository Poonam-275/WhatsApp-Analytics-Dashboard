import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

class RecipientDto {
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class CreateCampaignDto {
  @IsString()
  @Length(1, 200)
  name!: string;

  @IsString()
  @Length(1, 4000)
  messageContent!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipientDto)
  recipientList!: RecipientDto[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledAt?: Date;
}
