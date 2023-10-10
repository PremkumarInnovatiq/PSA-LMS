import { formatDate } from '@angular/common';
export class Teachers {
  
  
  id: number;
  avatar: string;
  name: string;
  email: string;
  date: string;
  gender: string;
  mobile: string;
  department: string;
  degree: string;
  qualification:string;
  joiningDate:string;
  data:any;
  constructor(teachers: Teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.avatar = teachers.avatar || 'assets/images/user/user1.jpg';
      this.name = teachers.name || '';
      this.email = teachers.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.gender = teachers.gender || '';
      this.mobile = teachers.mobile || '';
      this.department = teachers.department || '';
      this.degree = teachers.degree || '';
      this.qualification = teachers.qualification || '';
      this.joiningDate = teachers.joiningDate || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
