import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Project,
  ProjectDocument,
} from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from '../pagination/pagination-query.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(createProjectDto);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.projectModel.find().skip(skip).limit(limit).exec(),
      this.projectModel.countDocuments(),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    this.validateId(id);

    const project = await this.projectModel.findById(id).exec();

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    this.validateId(id);

    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return {
        message: 'Projeto atualizado com sucesso',
        project,
    };
  }

  async remove(id: string) {
    this.validateId(id);

    const project = await this.projectModel
      .findByIdAndDelete(id)
      .exec();

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return { message: 'Projeto deletado com sucesso' };
  }

  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID do projeto inválido');
    }
  }
}