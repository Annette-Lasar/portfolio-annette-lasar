import { StaticProject } from './static-project.interface.js';

export interface MergedProject extends StaticProject {
  description: string;
  test_button: string;
}
