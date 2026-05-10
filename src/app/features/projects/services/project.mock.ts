import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsMockApi {
  private delay<T>(data: T, ms?: number): Promise<T> {
    const wait = ms ?? faker.number.int({ min: 300, max: 800 });
    return new Promise((resolve) => setTimeout(() => resolve(data), wait));
  }

  getProjects(): Promise<Project[]> {
    const count = faker.number.int({ min: 5, max: 12 });
    const projects: Project[] = Array.from({ length: count }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.catchPhrase(),
      owner: faker.person.fullName(),
      progress: faker.number.int({ min: 0, max: 100 }),
      due: faker.date.future().toISOString(),
    }));
    return this.delay(projects);
  }
}
