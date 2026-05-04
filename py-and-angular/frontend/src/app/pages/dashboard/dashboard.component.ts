import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxLuzmoDashboardModule } from '@luzmo/ngx-embed';
import { EmbedService, EmbedConfig } from '../../services/embed.service';

const DASHBOARD_IDS: Record<string, string> = {
  wallace: '9743e36d-7d9c-4703-bf4c-f347cb85169f',
  michael: '3c47cf45-fcb6-4920-a5a8-b79852519552',
  sales: 'e43545ae-353b-46d8-b96d-bc882e0aaf33',
};

const SALES_REPS = new Set(['dwight', 'jim', 'phyllis', 'stanley', 'andy']);

const NAMES: Record<string, string> = {
  wallace: 'David',
  michael: 'Michael',
  dwight: 'Dwight',
  jim: 'Jim',
  phyllis: 'Phyllis',
  stanley: 'Stanley',
  andy: 'Andy',
};

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgxLuzmoDashboardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  role = 'wallace';
  name = 'David';
  dashboardId = DASHBOARD_IDS['wallace'];
  embedConfig: EmbedConfig | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private embedService: EmbedService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.role = params['role'] || 'wallace';
      this.name = NAMES[this.role] || 'User';
      this.dashboardId = SALES_REPS.has(this.role)
        ? DASHBOARD_IDS['sales']
        : DASHBOARD_IDS[this.role] || DASHBOARD_IDS['wallace'];
      this.loadEmbed();
    });
  }

  private loadEmbed(): void {
    this.embedConfig = null;
    this.error = null;

    this.embedService.getEmbedToken(this.role).subscribe({
      next: (config) => (this.embedConfig = config),
      error: (err) => (this.error = err.message || 'Failed to load dashboard'),
    });
  }
}
