import { Component } from '@angular/core';
import { TAB_MENU_ITEMS } from '../../tab-menu-items';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  items = TAB_MENU_ITEMS;
daysOfWeek: any;
isFridayOrLater: boolean | undefined;
activeItem: MenuItem|undefined;
 
  constructor(){
    this.checkIfFridayOrLater();
  }

  checkIfFridayOrLater(){
    const today = new Date().getDay();
    this.isFridayOrLater = today >= 5;
  }
  
}
