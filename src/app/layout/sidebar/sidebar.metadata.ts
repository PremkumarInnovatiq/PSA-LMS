// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  submenu: RouteInfo[];
}
export class MenuItem {
  path!: string;
  title!: string;
  id!:string;
  iconType!: string;
  icon!: string;
  class!: string;
  badge!: string;
  badgeClass!: string;
  groupTitle!: boolean;
  open!: boolean;
  role!: string[];
  // action:any;
  children!: MenuItem[];
}

