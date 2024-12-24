import { Component, OnInit } from '@angular/core';
import { format, startOfWeek, addDays, eachDayOfInterval, format as formatDate } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
// import { Schedule } from '../../interfaces/schedule.model';

interface TimeSlot {
  time: string;
  event: string | null; // Event description or null if no event
}

interface DaySchedule {
  dayName: string;
  date: Date;
  formattedDate: string;
  times: TimeSlot[];
}

@Component({
  selector: 'app-current-week-schedule',
  templateUrl: './current-week-schedule.component.html',
  styleUrls: ['./current-week-schedule.component.css']
})
export class CurrentWeekScheduleComponent implements OnInit {
  user : any;
  day: any;
  daysOfWeek: DaySchedule[] = [];
  shifts: TimeSlot[] = [];
  timeSlots: TimeSlot[] = [];
  shift: any;
  // schedules: Schedule[] = [];

  // Placeholder for dynamically fetched shift times
  shiftTimes: { [key: string]: { start: number, end: number } } = {};

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    // this.fetchShiftTimes().subscribe(() => {
    //   this.generateShifts(); // Generate shifts after fetching the data
    //   this.generateWeekDays();
    // });
    // this.generateTimeSlots(); // Generate all time slots for the table rows
    if (this.user && this.user.schedules) {
      this.fetchShiftTimesFromUser(); // Use user data to fetch shift times
      this.generateShifts(); // Generate shifts after fetching the data
      this.generateWeekDays();
      this.generateTimeSlots(); // Generate all time slots for the table rows
    } else {
      console.error('No user or schedules found!');
    }
  }

  // Method to fetch shift times from the backend
  // fetchShiftTimes(): Observable<void> {
  //   return this.authService.getSchedule().pipe(
  //     tap(response => {
  //       this.shiftTimes = {}; // Reset shiftTimes object
        
  //       // Map the response to shiftTimes structure
  //       response.forEach(shift => {
  //         const dayName = shift.day.charAt(0).toUpperCase() + shift.day.slice(1).toLowerCase(); // Capitalize the first letter
  //         this.shiftTimes[dayName] = { start: shift.start, end: shift.end };
  //       });

  //       console.log(this.shiftTimes); // Log the shiftTimes for debugging
  //     }),
  //     map(() => { }) // Return an empty observable after processing the data
  //   );
  // }
  fetchShiftTimesFromUser(): void {
    this.shiftTimes = {}; // Reset shiftTimes object
  
    // Map the schedules from the user object to the shiftTimes structure
    this.user.schedules.forEach((shift: any) => {
      const dayName = shift.day.charAt(0).toUpperCase() + shift.day.slice(1).toLowerCase(); // Capitalize the first letter
      this.shiftTimes[dayName] = { start: shift.start, end: shift.end };
    });
  
    console.log(this.shiftTimes); // Log the shiftTimes for debugging
  }

  generateWeekDays(): void {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 0 }); // Week starts on Monday
    const end = addDays(start, 6);

    this.daysOfWeek = eachDayOfInterval({ start, end }).map(date => {
      const dayName = formatDate(date, 'eeee');
      const formattedDate = formatDate(date, 'yyyy-MM-dd');
      const times = this.generateTimeIntervalsForDay(dayName);
      
      return {
        dayName,
        date,
        formattedDate,
        times
      };
    });
  }

  generateShifts(): void {
    this.shifts = this.generateTimeIntervalsForShifts(this.shiftTimes);
  }

  generateTimeIntervalsForDay(dayName: string): TimeSlot[] {
   
    const intervals: TimeSlot[] = [];
    const startHour = 8; // Start time (8 AM)
    const endHour = 23; // End time (11 PM)

    for (let hour = startHour; hour <= endHour; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const hour12 = hour % 12 || 12;
      
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        let event = null;

        if (this.shiftTimes[dayName] && hour >= this.shiftTimes[dayName].start && hour < this.shiftTimes[dayName].end) {
          event = 'Shift'; 
        }

        intervals.push({
          time: timeString,
          event
        });
      }
    }

    return intervals;
  }

  generateTimeIntervalsForShifts(shiftTimes: { [key: string]: { start: number, end: number } }): TimeSlot[] {
    const intervals: TimeSlot[] = [];
    const startHour = 8; // Start time (8 AM)
    const endHour = 23; // End time (11 PM)

    for (let hour = startHour; hour <= endHour; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const hour12 = hour % 12 || 12;

      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        let event = null;

        for (const [day, shift] of Object.entries(shiftTimes)) {
          if (hour >= shift.start && hour < shift.end) {
            event = `Shift on ${day}`;
            break;
          }
        }

        intervals.push({
          time: timeString,
          event
        });
      }
    }
    return intervals;
  }

  generateTimeSlots(): void {
    const startHour = 8; // Start time (8 AM)
    const endHour = 23; // End time (11 PM)

    this.timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? 'AM' : 'PM';
        const hour12 = hour % 12 || 12;
        const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        this.timeSlots.push({ time: timeString, event: null });
      }
    }
  }

  isShiftTime(day: DaySchedule, time: string): boolean {
    return !!day.times.find(t => t.time === time && t.event);
  }
}
