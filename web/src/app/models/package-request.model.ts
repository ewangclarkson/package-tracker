import {Location} from "./location.model";

export interface PackageRequest {
  description: string | undefined,
  weight: number  | undefined,
  width: number  | undefined,
  height: number  | undefined,
  depth: number  | undefined,
  from_name: string  | undefined,
  from_address: string | undefined,
  from_location: Location | undefined,
  to_name: string | undefined,
  to_address: string | undefined,
  to_location: Location  | undefined
}
