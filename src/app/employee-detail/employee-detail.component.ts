import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EmployeeDataService, IEmployee} from '../services/employee-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {

  rowData: IEmployee[] = [];

  @Input() empId: any;

  showAddNew = false;
  dataSource: MatTableDataSource<IEmployee>;
  employeeForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnDefs: string[] = ['projectId', 'projectName', 'status',
    'projectAllocation', 'projectstartDate', 'projectendDate'];

  constructor(private employeeData: EmployeeDataService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dataShare: EmployeeDataService) {
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      projectId: ['', Validators.required],
      projectName: ['', Validators.required],
      projectAllocation: ['', Validators.required],
      status: [[], Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required]
    });
    this.refreshData(this.empId);
  }

  refreshData(empId) {
    this.rowData = this.employeeData.getProjectList(empId);
    this.dataSource = new MatTableDataSource<IEmployee>(this.rowData);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.dataShare.deleteEmployee(this.empId, employee);
  }

}
