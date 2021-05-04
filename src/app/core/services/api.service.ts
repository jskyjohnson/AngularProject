import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getList() {
    return this.httpClient.get(`https://picsum.photos/list`, {
      responseType: 'json',
    });
  }
}
