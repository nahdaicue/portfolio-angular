import { ProfileModel } from "./profile-model";
import { ProjectModel } from "./project-model";
import { UserModel } from "./user-model";

export interface PortfolioModel {
  user: UserModel;
  profile: ProfileModel;
  projects: ProjectModel[];
}
