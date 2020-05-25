import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee, IProject} from './employee-data.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  countryUrl = 'assets/project-list.json';
  employeeUrl = 'assets/employee-list.json';

  constructor(private http: HttpClient) { }

  getCountryData(): Observable<any> {
    return this.http.get(this.countryUrl);
  }

  getEmployeeData(): Observable<any> {
    return this.http.get(this.employeeUrl);
  }

  addEmployee(request: any) {
    return this.http.post(environment.baseUrl + environment.employee.save, request);
  }

  getEmployeeByProjectId(projectId: number): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(environment.baseUrl + environment.employee.getByProjectId + '?id=' + projectId);
  }
}
