interface GetRequestObject {
  method: 'GET';
  mode: RequestMode;
  headers: HeadersInit;
  credencials: RequestCredentials;
}

/* eslint-disable no-async-promise-executor */
const getCodes = async (): Promise<Record<string, Array<string>>> =>
  new Promise(async (resolve, reject) => {
    const initObject: GetRequestObject = {
      method: 'GET',
      mode: 'cors',
      credencials: 'include',
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY as string,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_VALIDATOR_API as string}/prod/code`,
        initObject
      );

      if (!response.ok) {
        reject(new Error('Error getting hash'));
      }

      const data = await response.json();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });

export default getCodes;
