import { Calendar, Employee } from "@prisma/client";

declare interface NewEmployeeCalendar {
  name: string;
  employeeId: number;
}

declare interface NewKitCalendar {
  name: string;
  kitId: number;
}
