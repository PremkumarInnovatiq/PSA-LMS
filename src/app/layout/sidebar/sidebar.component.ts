/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ROUTES } from './sidebar-items';
import { AuthService, Role } from '@core';
import { MenuItem, RouteInfo } from './sidebar.metadata';
import { AuthenService } from '@core/service/authen.service';
import { AdminService } from '@core/service/admin.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() menuitem: MenuItem[]=[];
  @Output() menuItemClick = new EventEmitter();

  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  routerObj;
  typesList: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private authenService:AuthenService,
    private adminService: AdminService
  ) {
    this.elementRef.nativeElement.closest('body');
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  getUserTypeList(filters?:any) {
    this.adminService.getUserTypeList( {}).subscribe(
      (response: any) => {
        let userType = localStorage.getItem('user_type')
        let data = response.docs.filter((item:any) => item.typeName === userType);
        this.menuitem = data[0].menuItems;
        console.log('menu',this.menuitem)
        let limit = filters?.limit ? filters?.limit : 10;
        if (response.totalDocs <= limit || response.totalDocs <= 0) {
        }
      },
      (error) => {
      }
    );
  }
  navigateTo(menu:any,url:any) {    
    this.menuItemClick.emit();
    let userType = localStorage.getItem('user_type')
    this.router.navigateByUrl(userType + '/' + menu +'/'+url);
}


  ngOnInit() {
    if (this.authenService.currentUserValue) {
      const userRole = this.authenService.currentUserValue.user.role;
      this.userFullName =
        this.authenService.currentUserValue.user.name 
      this.userImg = this.authenService.currentUserValue.user.avatar;
      this.getUserTypeList();

      // this.sidebarItems = ROUTES.filter(
      //   (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf('All') !== -1
      // );
      console.log('ite',this.menuitem)
      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Instructor) {
        this.userType = Role.Instructor;
      } else if (userRole === Role.Student) {
        this.userType = Role.Student;
      } else if (userRole === Role.TrainingAdministrator) {
        this.userType = Role.TrainingAdministrator;
      } else if (userRole === Role.Supervisor) {
        this.userType = Role.Supervisor;
      } else if (userRole === Role.HOD) {
        this.userType = Role.HOD;
      } else if (userRole === Role.TrainingCoordinator) {
        this.userType = Role.TrainingCoordinator;
      } else if (userRole === Role.CourseManager) {
        this.userType = Role.CourseManager;
      } else {
        this.userType = Role.Admin;
      }
    }

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
        localStorage.clear;
      }
    });
  }
}
