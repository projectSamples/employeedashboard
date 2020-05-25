// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://localhost:10090/dashboard/',
  employee: {
    getAll: 'employee/getall',
    save: 'employee/save',
    getById: 'employee/getById',
    getByProjectId: 'employee/getByProjId',
    delete: 'employee/deleteByEmpId',
  },
  projects: {
    save: 'projects/save',
    getById: 'projects/getById',
    getDetails: 'projects/getProjectDetails',
    getAll: 'projects/getall',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
