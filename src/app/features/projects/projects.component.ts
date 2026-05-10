import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsStore } from './store/projects.store';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [TableModule, ProgressBarModule, CardModule, TagModule, AvatarModule, CommonModule],
  templateUrl: 'projects.html',
})
export class ProjectsComponent implements OnInit {
  store = inject(ProjectsStore);

  ngOnInit() {
    this.store.loadProjects();
  }
}
