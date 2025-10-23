import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private baseUrl = environment.apiUrl;

  get<T>(path: string) { return this.http.get<T>(`${this.baseUrl}${path}`, { headers: this.authHeaders }); }
  post<T>(path: string, body: any) { return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers: this.mergeHeaders(this.jsonHeaders, this.authHeaders) }); }
  put<T>(path: string, body: any) { return this.http.put<T>(`${this.baseUrl}${path}`, body, { headers: this.mergeHeaders(this.jsonHeaders, this.authHeaders) }); }
  delete<T>(path: string) { return this.http.delete<T>(`${this.baseUrl}${path}`, { headers: this.authHeaders }); }

  private get jsonHeaders() { return new HttpHeaders({ 'Content-Type': 'application/json' }); }
  private get authHeaders() {
    const token = this.auth.token;
    return token ? new HttpHeaders({ Authorization: `Basic ${token}` }) : new HttpHeaders();
  }
  private mergeHeaders(a: HttpHeaders, b: HttpHeaders) {
    let merged = a;
    b.keys().forEach(k => {
      const v = b.get(k);
      if (v) merged = merged.set(k, v);
    });
    return merged;
  }
}