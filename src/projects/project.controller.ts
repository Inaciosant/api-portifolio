import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Controller,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from '../pagination/pagination-query.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('projetos')
@Controller('projetos')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo projeto' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os projetos' })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.projectsService.findAll(paginationQuery);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Busca um projeto por ID' })
  buscar(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um projeto por ID' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um projeto por ID' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
