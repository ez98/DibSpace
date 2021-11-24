import { v4 as uuid } from "uuid";
import { dispatch } from "serpens";
import { getTokenByrefreshToken } from "services/login";
import { getToken } from "./token";

interface QueueMember {
  key: string;
  url?: string;
  options?: Headers;
  request: any;
  resourcesError?: Error;
  refreshStatus?: boolean;
}
class Queue {
  private data: QueueMember[] = [];

  public refreshStatus: boolean = true;

  public enqueue = (element: QueueMember) => {
    this.data.push(element);
  };

  public dequeue = () => {
    return this.data.shift();
  };

  public front() {
    return this.data[0];
  }

  public isEmpty() {
    return this.getLength() === 0;
  }

  public clear() {
    this.data = [];
  }

  public getLength() {
    return this.data.length;
  }
}
const queue = new Queue();
const wait = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 100);
  });
// let logout = false

const waitRefreshToken = (request: any) => {
  return new Promise((resolve: any, reject: any) => {
    const insideAsync = async () => {
      if (queue.refreshStatus) {
        queue.refreshStatus = false;
        const shouldError = queue.front()?.resourcesError ;
        reject(shouldError);
        queue.dequeue();
        return dispatch({
          type: "login/logout",
          payload: window.location.hash.replace("#", ""),
        });
      }

      await request(queue.front().url, queue.front().options).then(
        (res: any) => {
          resolve(res);
          queue.dequeue();
        },
        (err: any) => {
          reject(err);
          queue.dequeue();
        }
      );
    };
    insideAsync();
  });
};

const mainThread = async (key: string, request: any) => {
  while (!queue.isEmpty()) {
    if (key === queue.front().key) {
      /* eslint no-return-await: "off" */
      return await waitRefreshToken(request).finally(() => {
        if (queue.isEmpty()) {
          queue.refreshStatus = true;
        }
      });
    }
    /* eslint no-await-in-loop: "off" */
    await wait();
  }
};

const fetching = async (url: string, options: Headers, request: any) => {
  const key = uuid();
  if (queue.isEmpty()) {
    const token = getToken();
    const shouldOptions = {
      ...options,
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await request(url, shouldOptions);
      return response;
    } catch (error) {
      const { status } = error;
      if (status === 401) {
        queue.enqueue({
          key,
          url,
          options,
          request,
          resourcesError: error,
          refreshStatus: true,
        });
        return mainThread(key, request).then(
          (res) => res,
          (err) => {
            throw err;
          }
        );
      }
      throw error;
    }
  } else {
    queue.enqueue({
      key,
      url,
      options,
      request,
    });
    return mainThread(key, request);
  }
};

const wrapRefreshToken = (request: RequestType) => {
  return (url: string, options: Headers): Promise<any> => {
    return fetching(url, options, request);
  };
};

export default wrapRefreshToken;
