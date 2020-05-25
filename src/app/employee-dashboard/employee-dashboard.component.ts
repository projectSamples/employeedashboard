import { Component, OnInit } from '@angular/core';
import {EmployeeDataService, ICountry} from '../services/employee-data.service';
import {HttpDataService} from '../services/http-data.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  countries: ICountry[] = [];

  constructor(private dataShare: EmployeeDataService,
              private userData: HttpDataService,
              private router: Router) { }

  ngOnInit() {
    if (this.dataShare.getCountryList()) {
      this.countries = this.dataShare.getCountryList();
      return;
    }
    this.userData.getCountryData().subscribe(data => {
      this.countries = data.Metlife;
      this.countries.map((c: any, index: any) => {
        c.cols = 2;
        c.rows = 1;
        if (c.countyName === 'LATAM') {
          c.background = 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)';
        } else if (c.countyName === 'JAPAN') {
          c.background = 'linear-gradient(90deg, #d53369 0%, #daae51 100%)';
        } else if (c.countyName === 'AUSTRALIA') {
          c.background = 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)';
        } else if (c.countyName === 'SINGAPORE') {
          c.background = 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)';
        }
      });
      this.dataShare.setCountryList(this.countries);
    });
  }

  countryChanged(country: any) {
    this.router.navigate(['/employee-list', country.projectId]);
  }
}
