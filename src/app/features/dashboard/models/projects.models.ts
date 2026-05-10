export interface Project {
  readonly name: string;
  readonly owner: string;
  readonly progress: number;
  readonly due: string;
}

export interface DoneProject {
  readonly name: string;
  readonly owner: string;
  readonly completed: string;
}

export interface HeldProject {
  readonly name: string;
  readonly owner: string;
  readonly reason: string;
}
