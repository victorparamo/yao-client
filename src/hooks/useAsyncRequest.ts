import { useCallback, useEffect, useState } from 'react';

export type UseAsyncRequestCallback<DataT> = (
  ...args: Array<any>
) => Promise<DataT>;

export type UseAsyncRequestResultSuccess<DataT> = {
  execute: (...args: Array<any>) => Promise<void>;
  data: DataT;
  state: 'success';
  isLoading: boolean;
  isSuccess: boolean;
};

export type UseAsyncRequestResultLoading = {
  execute: (...args: Array<any>) => Promise<void>;
  state: 'loading';
  isLoading: boolean;
  isSuccess: boolean;
  data: null;
};

export type UseAsyncRequestResultIDLE = {
  execute: (...args: Array<any>) => Promise<void>;
  state: 'idle';
  isLoading: boolean;
  isSuccess: boolean;
  data: null;
};

export type UseAsyncRequestResultError = {
  execute: (...args: Array<any>) => Promise<void>;
  error?: string | Record<string, string>;
  state: 'error';
  isLoading: boolean;
  isSuccess: boolean;
  data: null;
};

type UseAsyncRequestResult<DataT> =
  | UseAsyncRequestResultSuccess<DataT>
  | UseAsyncRequestResultLoading
  | UseAsyncRequestResultIDLE
  | UseAsyncRequestResultError;

export interface UseAsyncRequestOptions<DataT> {
  /**
   * Execute the callback immediately when component is mounted. If this
   * is true then the callback should not accept any arguments.
   */
  eager?: boolean;
  /**
   * Callback useful to execute side effects when the request fails, e.g.
   * showing a toast with an error message.
   */
  onError?: (error: any) => void;
  /**
   * Callback useful to execute side effects when the request is successful,
   * e.g. showing a toast with a success message.
   */
  onSuccess?: (data: DataT) => void;
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Hook used to execute async requests and track its progress in a consistent
 * manner. It borrows some concepts from Apollo useQuery without depending on
 * GraphQL and react-query but simpler and does not introduce dependencies.
 */
export default <DataT>(
  callback: UseAsyncRequestCallback<DataT>,
  options?: UseAsyncRequestOptions<DataT>
): UseAsyncRequestResult<DataT> => {
  const [state, setState] = useState<RequestStatus>('idle');
  const [data, setData] = useState<DataT>();
  const [error, setError] = useState();

  const onError = options?.onError;
  const onSuccess = options?.onSuccess;
  const eager = options?.eager;

  const execute = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (...args) => {
      setState('loading');
      setError(undefined);
      setData(undefined);

      return callback(...args)
        .then((response) => {
          setState('success');
          setData(response);

          if (onSuccess) {
            onSuccess(response);
          }
        })
        .catch((e) => {
          setState('error');
          setError(e);

          if (onError) {
            onError(e);
          }
        });
    },
    [callback, onSuccess, onError]
  );

  useEffect(() => {
    if (eager) {
      execute();
    }
  }, [eager, execute]);

  if (state === 'loading') {
    return {
      isLoading: true,
      isSuccess: false,
      execute,
      state: 'loading',
      data: null,
    };
  }
  if (state === 'error') {
    return {
      isLoading: false,
      isSuccess: false,
      error,
      execute,
      state: 'error',
      data: null,
    };
  }
  if (data) {
    return {
      isLoading: false,
      isSuccess: true,
      data: data as DataT,
      execute,
      state: 'success',
    };
  }

  return {
    isLoading: false,
    isSuccess: false,
    execute,
    state: 'idle',
    data: null,
  };
};
