import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmbedConfig {
  authKey: string;
  authToken: string;
  appServer: string;
  apiHost: string;
}

@Injectable({ providedIn: 'root' })
export class EmbedService {
  constructor(private http: HttpClient) {}

  getEmbedToken(role: string): Observable<EmbedConfig> {
    return this.http.post<EmbedConfig>('/api/embed', { role });
  }
}
