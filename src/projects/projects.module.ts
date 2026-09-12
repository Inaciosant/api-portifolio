import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './project.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Project, ProjectSchema} from './entities/project.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
    AuthModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}