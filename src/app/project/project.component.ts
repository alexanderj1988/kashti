import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Build } from '../models/build';
import { Project } from '../models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  project: Project;
  builds: Build[];
  location: Location;

  constructor(private route: ActivatedRoute, location: Location) { this.location = location; }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.builds = this.route.snapshot.data['builds'].map(build => {
      if (build.worker) {
        if (build.worker.end_time === '0001-01-01T00:00:00Z') {
          build.worker.end_time = build.worker.start_time;
        }
      }
      return build;
    });
  }

  CalculateProviderLogoClass(buildProvider) {
    switch (buildProvider) {
      case 'github':
        return 'icon ion-logo-github';
      default:
        return 'icon ion-logo-tux';
    }
  }
}
