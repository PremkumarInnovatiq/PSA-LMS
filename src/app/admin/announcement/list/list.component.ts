import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from '@core/service/announcement.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  breadscrums = [
    {
      title: 'Announcement',
      items: ['List'],
      active: 'Announcement',
    },
  ];
  displayedColumns: string[] = [
    'Title',
    'Decription',
    'Actions'
  ];
  dataSource: any;
  create = true;
  status = true;
  pageSizeArr = this.utils.pageSizeArr;
  totalItems: any;
  editUrl: any;
  isLoading = false;
  announcementData: any[] = [];



  onButtonClicked(card: any) {
    console.log('Button clicked for card:', card.title);
  }

  deleteAnnouncement(announcementId: any) {
    this.announcementService.deleteAnnouncement(announcementId).subscribe((res: any) => {
      Swal.fire({
        title: 'Successful',
        text: "Announcement deleted successfully",
        icon: 'success',
      });

      this.activatedRoute.queryParams.subscribe(params => {
        this.getAnnouncementList(params);
      });
      this.cdr.detectChanges();
    });

  }



  edit(id: any) {
    this.router.navigate(['/Announcement/edit/' + id]);
  }
  toggleList() {
    this.create = !this.create;
  }

  toggleStatus() {
    this.status = !this.status;
  }

  constructor(private router: Router,
    public utils: UtilsService,
    private announcementService: AnnouncementService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,

  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAnnouncementList(params);
    });
  }

  getAnnouncementList(filter: any) {
    this.announcementService.getAnnouncementList(filter).subscribe((res: { data: { data: any[]; }; totalRecords: number; }) => {
      this.isLoading = false;
      this.dataSource = res.data.data;
      let limit = filter.limit ? filter.limit : 10
      if (res.totalRecords <= limit || res.totalRecords <= 0) {

        this.isLoading = true;
      }
      this.cdr.detectChanges();


      console.log("res====", res.totalRecords);

      this.cdr.detectChanges();
    })
  }
}
