export enum Type {
  DATE = 'date',
  TIME = 'time',
  DATETIME_LOCAL = 'datetime-local',
}

export interface DateTimePickerChangeEventDetail {
  dateStr: string;
  selectedDates: Date[];
}
