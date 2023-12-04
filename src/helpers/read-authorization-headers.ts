export function readAuthorizationHeaders(req: any, _res: any): [string | false, string | false] {
  const auth = req.headers.authorization;
  if (!auth) {
    return [false, false];
  }
  return (Buffer.from((auth||"").split(' ')[1], 'base64').toString()||"").split(':') as [string, string];
}