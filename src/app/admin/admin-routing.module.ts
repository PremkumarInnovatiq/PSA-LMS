import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule-class/schedule-class.module').then((m) => m.ScheduleClassModule),
  },
  {
    path: 'program',
    loadChildren: () =>
      import('./program/program.module').then((m) => m.ProgramModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'survey',
    loadChildren: () =>
      import('./survey/survey.module').then((m) => m.SurveyModule),
  },
  {
    path: 'email-configuration',
    loadChildren: () =>
      import('./email-configuration/email-configuration.module').then((m) => m.EmailConfigurationModule),
  },
  {
    path: 'banners',
    loadChildren: () =>
      import('./banners/banner.module').then((m) => m.BannerModule),
  },
  {
    path: 'announcement',
    loadChildren: () =>
      import('./announcement/announcement.module').then((m) => m.AnnouncementModule),
  },
  {
    path: 'certificate',
    loadChildren: () =>
    import('./certificate-builder/certificate.module').then((m) => m.CertificateModule)

  },
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'holidays',
    loadChildren: () =>
      import('./holidays/holidays.module').then((m) => m.HolidaysModule),
  },
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.module').then((m) => m.FeesModule),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then((m) => m.AttendanceModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
