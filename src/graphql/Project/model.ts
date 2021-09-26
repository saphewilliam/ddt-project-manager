import { enumType } from 'nexus';
import { Project, ProjectStatus, ProjectType } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const projectTypeEnum = enumType(ProjectType);
export const projectStatusEnum = enumType(ProjectStatus);
export const projectModel = nexusModel(Project);
