import { ProjectToTranslate } from './project-to-translate.interface';

export interface ProjectWrapper {
    [key: string]: ProjectToTranslate;
}