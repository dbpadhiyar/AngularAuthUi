import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7224/api/User/GetAllUser';

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<any>(this.baseUrl);
  }
}
