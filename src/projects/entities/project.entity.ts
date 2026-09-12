import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  languages: string[];

  @Prop()
  linkdeploy?: string;

  @Prop()
  linkgithub?: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);