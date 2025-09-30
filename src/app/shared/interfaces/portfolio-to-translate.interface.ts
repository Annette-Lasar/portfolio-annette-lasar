import { ProjectToTranslate } from './project-to-translate.interface.js';

export interface PortfolioToTranslate {
  introduction: string;
  projects: ProjectToTranslate[];
}