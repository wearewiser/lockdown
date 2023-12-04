export function isAccessCheckOn(): boolean {
  return (process.env.LOCKDOWN_ON||"").toUpperCase() === "TRUE";
}