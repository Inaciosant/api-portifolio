import { IsString, IsOptional,IsUrl, IsArray,MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ example: 'Portfólio API' })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 'API para gerenciamento de projetos' })
    @IsString()
    @MinLength(10)
    description: string;

    @ApiProperty({ example: ['Node.js', 'NestJS', 'MongoDB'] })
    @IsArray()
    @IsString({ each: true })
    languages: string[];
    
    @ApiPropertyOptional({ example: 'https://meu-projeto.com' })
    @IsOptional()
    @IsUrl()
    linkdeploy?: string;

    @ApiPropertyOptional({ example: 'https://github.com/meu-projeto' })
    @IsOptional()
    @IsUrl()
    linkgithub?: string;
}