export interface IProfile {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  links: Object;
  manager: string;
  phone: string;
  photo: string;
  skills: string[];
}

export interface ISearchablePerson {
  filterKey: string;
  id: string;
  profile: IProfile;
}
