import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement-t-c',
  templateUrl: './agreement-t-c.component.html',
  styleUrls: ['./agreement-t-c.component.scss']
})
export class AgreementTCComponent {
  breadscrums = [
    {
      title: 'Agreement T&C',
      items: ['Instructor'],
      active: 'Agreement T&C',
    },
  ];

}
