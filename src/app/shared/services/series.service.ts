import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SeriesService {
  constructor(private http: HttpClient) {
  }
  getSeries(page, limit) {
    return this.http.get(`http://localhost:3000/series?_page=${page}&_limit=${limit}`);
  }
  filter(str) {
    return this.http.get(`http://localhost:3000/series?q=${str}`);
  }
}
