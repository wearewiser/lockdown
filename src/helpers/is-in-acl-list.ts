export function isInAclList(user: string, pass: string): boolean {
  const ACL_LIST = (process.env.LOCKDOWN_ACL||"").split(",").map(entry=>(entry||"").split(":"));
  return !!ACL_LIST.find(([acl_user, acl_pass]) => acl_user === user && acl_pass === pass);
}