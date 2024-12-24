import { Component } from '@angular/core';

@Component({
  selector: 'app-request-schedule',
  templateUrl: './request-schedule.component.html',
  styleUrl: './request-schedule.component.css'
})
export class RequestScheduleComponent {

  shiftComponents: any[] = []; // Array to hold shift data

  minTime: Date;
  maxTime: Date;
  timeOptions: any[] = [];

  displayConfirmation: boolean = false;

  // Method to open confirmation dialog
  showConfirmDialog() {
    this.displayConfirmation = true;
  }

  // Method to handle confirmation
  onConfirm() {
    this.submitShifts();
    this.displayConfirmation = false; // Close the dialog
  }

  // Method to handle cancellation
  onReject() {
    this.displayConfirmation = false; // Close the dialog
  }

  constructor() {
    // Set the minimum and maximum selectable times
    this.minTime = new Date();
    this.minTime.setHours(8, 0, 0); // 8:00 AM

    this.maxTime = new Date();
    this.maxTime.setHours(23, 0, 0); // 11:00 PM

    this.generateTimeOptions();
  }

  generateTimeOptions() {
    const start = new Date(0, 0, 0, 8, 0); // Start time (8:00 AM)
    const end = new Date(0, 0, 0, 23, 0); // End time (11:00 PM)
    const options = [];

    let current = start;
    while (current <= end) {
      const timeStr = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      options.push({ label: timeStr, value: timeStr });
      current = new Date(current.getTime() + 30 * 60000); // Add 30 minutes
    }

    this.timeOptions = options;
  }

  addShiftComponent() {
    // Add a new shift component object to the array
    this.shiftComponents.push({ date1: null, date2: null, date3: null });
  }

  removeShiftComponent(index: number){
     // Remove the shift component at the specified index
     this.shiftComponents.splice(index, 1);
  }

  submitShifts(){
    console.log('Submitted Shift Data:', this.shiftComponents);
    this.shiftComponents = [];
  }


}
