import { Component, OnInit } from '@angular/core';
import { List } from '../../list';
import { Release } from './release.model';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from './release.service';
import { ReleasesForm } from './releases.form';
import { Token } from '../tokens/token.model';
import { Environment } from '../environment.model';
import { AbstractControl } from '@angular/forms';
import { Deployed } from './deployed.model';

@Component({
  selector: 'qs-environments-releases',
  templateUrl: './environments-releases.component.html',
})
export class EnvironmentsReleasesComponent implements OnInit {
  public releases: List<Release> = new List<Release>();
  public environment: Environment;
  public form: ReleasesForm;
  public tokens: List<Token>;

  constructor(
    private route: ActivatedRoute,
    private releaseService: ReleaseService,
  ) {
  }

  refresh(): void {
    this.releaseService
      .findAllByEnvironmentId(this.environment.id).subscribe((releases: List<Release>) => this.releases = releases);
  }

  ngOnInit(): void {
    this.releases = this.route.snapshot.data.releases;
    this.environment = this.route.snapshot.data.environment;
    this.form = new ReleasesForm(this.route.snapshot.data.tokens, this.environment);
    this.tokens = this.route.snapshot.data.tokens;
  }

  submit(form: AbstractControl): void {
    let deployed: Deployed = new Deployed();
    deployed.environmentId = this.environment.id;
    deployed.release = form.value.version;
    deployed.state = form.value.state;
    deployed.token = this.tokens.list.find((token: Token) => token.id === form.value.token);
    this.releaseService.add(deployed).subscribe(() => this.refresh());
  }
}
