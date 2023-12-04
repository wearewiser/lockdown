import { accessDenied } from "./access-denied";
import { isAccessCheckOn } from "./is-access-check-on";
import { isInAclList } from "./is-in-acl-list";
import { readAuthorizationHeaders} from "./read-authorization-headers";

export function accessCheckOk(req: any, res: any): boolean {
  if (!isAccessCheckOn()) {
    return true;
  }
  const [user, pass] = readAuthorizationHeaders(req, res);
  if (user === false || pass === false) {
    return accessDenied(req, res);
  }
  if (!isInAclList(user, pass)) {
    return accessDenied(req, res);
  }
  return true;
}