import {Location} from "./location.model";
import {Status} from "../constants/status";

export interface DeliveryRequest {
  package_id: string | undefined,
  pickup_time: string | undefined,
  start_time: string | undefined,
  end_time: string | undefined,
  location: Location | undefined,
  status: Status | undefined
}
