import {Location} from "./location.model";
import {Status} from "../constants/status";

export interface DeliveryRequest {
  package_id: string,
  pickup_time: string,
  start_time: string,
  end_time: string,
  location: Location,
  status: Status
}
