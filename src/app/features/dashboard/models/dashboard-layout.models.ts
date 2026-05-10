export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
}

export interface ProjectNode {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
  readonly children?: ProjectNode[];
}
