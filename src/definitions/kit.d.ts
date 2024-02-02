import { Kit, Object, Employee, Calls, Calendar } from "@prisma/client";

declare interface NewKit {
  id: number;
  image: Image;
  name: string;
  description: string;
  hectareDay: number;
  active: boolean;
  objects?: Object[];
  employees?: Employee[];
  calls?: Call[];
  // Maybe change the calendar
  calendar?: Calendar;
}

declare interface ManageKitMembers {
  kitId: number;
  employeeId: number;
}

declare interface Image {
  file: ArrayBuffer;
  name: string;
}
