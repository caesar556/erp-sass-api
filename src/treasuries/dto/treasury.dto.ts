import { 
  IsNotEmpty,
  IsString,
  Length,
  IsOptional
} from 'class-validator';

export class CreateTreasuryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;
  
  @IsOptional()
  @IsString()
  @Length(0, 150)
  description?: string;
  
  @IsNotEmpty()
  @IsString()
  organizationId: string;
}