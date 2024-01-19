import { Calendar, Employee } from "@prisma/client";

// declare interface NewEmployeeCalendar {
//   name: string;
//   employeeId: number;
// }

// declare interface NewKitCalendar {
//   name: string;
//   kitId: number;
// }

declare interface CalendarHandler {
  name: string;
  employeeId: number;
  kitId: number;
}
