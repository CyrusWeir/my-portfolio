export interface projectTypes {
  id?: number;
  name: string;
  url: string;
  image: string;
  tech: string;
  context: string;
  video: string;
}

export interface projectProps {
  project: projectTypes | undefined;
}

export interface message {
  id?: number;
  user_name: string;
  email: string;
  message: string;
}
