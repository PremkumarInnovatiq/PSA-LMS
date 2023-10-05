export class LeaveRequest {
  id: number;
  instructorId!:string;
  className: string;
  applyDate: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
  docs:any;
  constructor(leaveRequest: LeaveRequest) {
    {
      this.id = leaveRequest.id || this.getRandomID();
      this.className = leaveRequest.className || '';
      this.applyDate = leaveRequest.applyDate || '';
      this.fromDate = leaveRequest.fromDate || '';
      this.toDate = leaveRequest.toDate || '';
      this.reason = leaveRequest.reason || '';
      this.status = leaveRequest.status || '';
      this.docs = leaveRequest.docs || [];
      this.instructorId = leaveRequest.instructorId || '';


    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
