import { formatDate } from '@angular/common';
export class Students {
  id: number;
  img: string;
  name: string;
  email: string;
  joiningDate: string;
  gender: string;
  mobile: string;
  department: string;
  rollNo: string;
  parentsPhone:string;
  parentsNmae:string;
  data:any;

  constructor(students: Students) {
    {
      this.id = students.id || this.getRandomID();
      this.img = students.img || 'assets/images/user/user1.jpg';
      this.name = students.name || '';
      this.email = students.email || '';
      this.joiningDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.gender = students.gender || '';
      this.mobile = students.mobile || '';
      this.department = students.department || '';
      this.rollNo = students.rollNo || '';
      this.parentsPhone = students.parentsPhone || '',
      this.parentsNmae = students.parentsNmae || '',
      this.data = students.data || [];
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
