import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataService, IEmployee} from '../services/employee-data.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpDataService} from '../services/http-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  rowData: IEmployee[] = [];
  projectId: any;
  showAddNew = false;
  dataSource: MatTableDataSource<IEmployee>;
  employeeForm: FormGroup;
  showEmpDetails = false;
  empId: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnDefs: string[] = ['empId', 'empName', 'status',
    'projectAllocation', 'projectstartDate', 'projectendDate',
    'deleteDetail', 'viewDetail'];

  constructor(private employeeData: EmployeeDataService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dataShare: EmployeeDataService,
              private httpService: HttpDataService) {
    this.route.params.subscribe((param: any) => {
      this.projectId = param.projectId;
      this.refreshData(param.projectId);
    });
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      projectAllocation: ['', Validators.required],
      status: [[], Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required]
    });
  }

  refreshData(projectId) {
    this.httpService.getEmployeeByProjectId(projectId).subscribe((response) => {
      this.rowData = response;
      this.dataSource = new MatTableDataSource<IEmployee>(this.rowData);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(employee, j) {
    this.dataShare.deleteEmployee(this.projectId, employee);
  }

  onAddNew($event) {
    this.showAddNew = false;
    this.httpService.addEmployee({
      empId: Math.floor((Math.random() * 100000) + 1),
      empName: this.employeeForm.controls.fullName.value,
      status: this.employeeForm.controls.status.value,
      projectAllocation: this.employeeForm.controls.projectAllocation.value,
      projectstartDate: this.employeeForm.controls.projectStartDate.value,
      projectendDate: this.employeeForm.controls.projectEndDate.value
    });
    this.refreshData(this.projectId);
  }

  viewDetail(element) {
    this.empId = element.empId;
    this.showEmpDetails = true;
  }

  onEmployeeDetails($event) {
    this.showEmpDetails = false;
  }
}

export interface IColumn {
  key: string;
  value: string;
  width: number;
}
