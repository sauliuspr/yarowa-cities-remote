
export class NetworkError extends Error {
    status: number;
  
    constructor(res: Response, url: string, body?: string) {
      const msg = `NetworkError: ${res.status} on ${url}${body ? `: ${body}` : ""}`;
      super(msg);
      this.status = res.status;
      Object.setPrototypeOf(this, NetworkError.prototype);
    }
  }

export const handleNetworkError = async (res: Response, url: string) => {
  let err;
  try {
    const body = await res.json();
    const msg = body.message.replace(/Error: /g, "");
    err = new NetworkError(res, url, msg);
  } catch {
    err = new NetworkError(res, url);
  }
  throw err;
};
