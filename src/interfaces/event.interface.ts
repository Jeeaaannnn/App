export default interface Event {
  id: number;
  producerId: string;
  producerName: string;
  to: string | Date;
  from: string | Date;
  allDay: string;
  notes: string;
  outcome: string;
  phone: string;
  reason: string;
  where: string;
}
