export interface BetterResponse<T = any> extends Response {
  data: T | any;
}

export default function betterFetch<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<BetterResponse<T>> {
  return new Promise((resolve, reject) => {
    fetch(input, init).then(async (response) => {
      const requestClone = response.clone() as BetterResponse<T>;

      const contentType = requestClone.headers.get('Content-Type');

      Object.assign(requestClone, {
        data: await (async () => {
          switch (contentType) {
            case 'application/json':
              return await requestClone.json();
            case 'text/plain':
              return await requestClone.text();
          }

          return null;
        })(),
      });

      response.ok ? resolve(requestClone) : reject(requestClone);
    });
  });
}
