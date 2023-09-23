import { Component, OnInit } from '@angular/core';
import { CourseService } from '@core/service/course.service';
import { InstructorService } from '@core/service/instructor.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
} from 'ng-apexcharts';
import Swal from 'sweetalert2';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
})
export class Dashboard2Component implements OnInit {
  public lineChartOptions!: Partial<ChartOptions>;
  breadscrums = [
    {
      title: 'Dashboad',
      items: [],
      active: 'Dashboard 2',
    },
  ];
  instructors: any;
  tillPreviousTwoMonthsStudents: any;
  tillPreviousFourMonthsStudents: any;
  tillPreviousSixMonthsStudents: any;
  tillPreviousEightMonthsStudents: any;
  tillPreviousTenMonthsStudents: any;
  tillPreviousTwelveMonthsStudents: any;
  twoMonthsAgoInstructors: any;
  fourMonthsAgoInstructors: any;
  sixMonthsAgoInstructors: any;
  eightMonthsAgoInstructors: any;
  tenMonthsAgoInstructors: any;
  twelveMonthsAgoInstructors: any;
  todayInstructors: any;
  weekInstructors: any;
  oneMonthAgoInstructors: any;
  programList: any;
  upcomingPrograms: any;
  constructor(private instructorService: InstructorService,
    private courseService: CourseService) {
    //constructor
  }

  ngOnInit() {
    this.getInstructorsList();
    this.getProgramList();
  }
  deleteItem(row: any) {
    // this.id = row.id;
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this Instructor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.instructorService.deleteUser(row.id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Instructor deleted successfully",
              icon: "success",
            });
            this.getInstructorsList()
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete  Instructor",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });

  }

  getInstructorsList() {
    let payload = {
      type: "Instructor"
    }
    this.instructorService.getInstructor(payload).subscribe((response: any) => {
      this.instructors = response.slice(0, 8);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const twoMonthsAgoStart = new Date(currentYear, currentMonth - 2, 1);
      const twoMonthsAgoEnd = currentDate;

      const oneMonthAgoStart = new Date(currentYear, currentMonth - 1, 1);
      const oneMonthAgoEnd = currentDate;

      const fourMonthsAgoStart = new Date(currentYear, currentMonth - 4, 1);
      const fourMonthsAgoEnd = new Date(currentYear, currentMonth - 2, 0);

      const sixMonthsAgoStart = new Date(currentYear, currentMonth - 6, 1);
      const sixMonthsAgoEnd = new Date(currentYear, currentMonth - 4, 0);

      const eightMonthsAgoStart = new Date(currentYear, currentMonth - 8, 1);
      const eightMonthsAgoEnd = new Date(currentYear, currentMonth - 6, 0);

      const tenMonthsAgoStart = new Date(currentYear, currentMonth - 10, 1);
      const tenMonthsAgoEnd = new Date(currentYear, currentMonth - 8, 0);

      const twelveMonthsAgoStart = new Date(currentYear, currentMonth - 12, 1);
      const twelveMonthsAgoEnd = new Date(currentYear, currentMonth - 10, 0);
      this.twoMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= twoMonthsAgoStart && createdAtDate <= twoMonthsAgoEnd
        );
      });

      this.fourMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= fourMonthsAgoStart && createdAtDate <= fourMonthsAgoEnd
        );
      });

      this.sixMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= sixMonthsAgoStart && createdAtDate <= sixMonthsAgoEnd
        );
      });
      this.eightMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= eightMonthsAgoStart && createdAtDate <= eightMonthsAgoEnd
        );
      });
      this.tenMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= tenMonthsAgoStart && createdAtDate <= tenMonthsAgoEnd
        );
      });
      this.twelveMonthsAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= twelveMonthsAgoStart && createdAtDate <= twelveMonthsAgoEnd
        );
      });

      this.todayInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate == currentDate
        );
      });
      const sevenDaysAgoDate = new Date(currentYear, currentMonth, currentDate.getDate() - 7);

      this.weekInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= sevenDaysAgoDate && createdAtDate <= currentDate );
      });

      this.oneMonthAgoInstructors = response.filter((item: { createdAt: string | number | Date; }) => {
        const createdAtDate = new Date(item.createdAt);
        return (
          createdAtDate >= oneMonthAgoStart && createdAtDate <= oneMonthAgoEnd
        );
      });
      this.chart1();

    }, error => {
    });
  }
  private chart1() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Instructors',
          data: [ this.twoMonthsAgoInstructors.length,
            this.fourMonthsAgoInstructors.length,
            this.sixMonthsAgoInstructors.length,
            this.eightMonthsAgoInstructors.length,
            this.tenMonthsAgoInstructors.length,
            this.twelveMonthsAgoInstructors.length
          ],
        },
        

      ],
      chart: {
        height: 270,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#9F78FF', '#858585'],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ['Last 2 Months', '4 Months', '6 Months', '8 Months', '10 Months', '12 Months'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        min: 0,
        max: 20,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  getProgramList(filters?: any) {
    this.courseService.getCourseProgram({status:'active'}).subscribe(
      (response: any) => {
        this.programList = response.docs;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();  
        const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
        this.upcomingPrograms = this.programList.filter((item: { sessionStartDate: string | number | Date; }) => {
          const sessionStartDate = new Date(item.sessionStartDate);
          return (
            sessionStartDate >= tomorrow 
          );
        });
      },
      (error) => {
      }
    );
  }
}
