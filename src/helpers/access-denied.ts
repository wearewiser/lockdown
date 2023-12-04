export function accessDenied(_req: any, res: any): boolean {
  setTimeout(() => {
    res.writeHead(401, "ACCESS DENIED", {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    });
    res.end();
  }, 1000);
  return false;
}