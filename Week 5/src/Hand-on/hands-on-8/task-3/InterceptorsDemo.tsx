import { useState } from 'react';

/**
 * HANDS-ON 8 - TASK 3: HTTP Interceptors
 * 
 * Steps 88-91: Auth interceptor, error handler, loading interceptor
 */

interface HttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}

interface HttpResponse {
  status: number;
  data: unknown;
}

const InterceptorsDemo = () => {
  const [requests, setRequests] = useState<Array<{ request: HttpRequest; response?: HttpResponse; error?: string }>>([]);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [authToken] = useState('Bearer mock-token-12345');
  const [simulateStatus, setSimulateStatus] = useState<200 | 401 | 500>(200);

  // Step 88: Auth Interceptor
  const authInterceptor = (request: HttpRequest): HttpRequest => {
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: authToken,
      },
    };
  };

  // Step 90: Error Handler Interceptor
  const errorHandlerInterceptor = (response: HttpResponse): HttpResponse => {
    if (response.status === 401) {
      console.log('Error Interceptor: 401 Unauthorized - Redirecting to login');
      alert('Session expired! Redirecting to login...');
    } else if (response.status === 500) {
      console.log('Error Interceptor: 500 Server Error - Showing notification');
      alert('Server error occurred. Please try again later.');
    }
    return response;
  };

  // Step 91: Loading Interceptor
  const makeRequest = async (url: string, method: string = 'GET') => {
    // Step 91: Set loading true before request
    setIsGlobalLoading(true);

    // Create initial request
    let request: HttpRequest = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Step 88: Apply auth interceptor
    request = authInterceptor(request);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));

    // Create response based on simulateStatus
    const response: HttpResponse = {
      status: simulateStatus,
      data: simulateStatus === 200 ? { courses: ['CS101', 'MATH201'] } : null,
    };

    // Step 90: Apply error handler interceptor
    errorHandlerInterceptor(response);

    // Add to request log
    setRequests(prev => [
      {
        request,
        response: simulateStatus === 200 ? response : undefined,
        error: simulateStatus !== 200 ? `HTTP ${simulateStatus} Error` : undefined,
      },
      ...prev,
    ].slice(0, 5));

    // Step 91: finalize - Set loading false after request completes or errors
    setIsGlobalLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔌 Task 3: HTTP Interceptors</h2>
        <p className="text-gray-600 mb-6">Steps 88-91: Auth, Error Handler, Loading interceptors</p>

        {/* Global Loading Spinner - Step 91 */}
        {isGlobalLoading && (
          <div className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Loading...
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Test Interceptors</h3>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-sm text-gray-600">Simulate Response:</span>
            {[200, 401, 500].map(status => (
              <button
                key={status}
                onClick={() => setSimulateStatus(status as 200 | 401 | 500)}
                className={`px-3 py-1 rounded text-sm font-mono ${
                  simulateStatus === status
                    ? status === 200 ? 'bg-green-500 text-white' :
                      status === 401 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={() => makeRequest('/api/courses')}
            disabled={isGlobalLoading}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg ${
              isGlobalLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            Make API Request
          </button>
        </div>

        {/* Step 88: Auth Token Display */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Step 88: Auth Interceptor
          </h3>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700 mb-2">Authorization header added to all requests:</p>
            <code className="text-xs bg-indigo-100 px-2 py-1 rounded text-indigo-800 font-mono">
              {authToken}
            </code>
          </div>
        </div>

        {/* Step 89: Request Log with Headers */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Step 89: Request Headers (DevTools View)
          </h3>
          <div className="space-y-4">
            {requests.map((req, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm">
                    {req.request.method} {req.request.url}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    req.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {req.error || '200 OK'}
                  </span>
                </div>
                <div className="text-xs font-mono text-gray-500">
                  <p className="text-purple-600">Request Headers:</p>
                  {Object.entries(req.request.headers).map(([key, value]) => (
                    <p key={key} className="ml-2">
                      <span className="text-gray-700">{key}:</span> {value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <p className="text-gray-500 text-center py-4">No requests yet. Click "Make API Request" above.</p>
            )}
          </div>
        </div>

        {/* Interceptor Registration */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Interceptor Registration</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-purple-400">// app.config.ts</p>
            <p className="text-green-400">provideHttpClient(</p>
            <p className="text-gray-300 ml-4">withInterceptors([</p>
            <p className="text-gray-300 ml-8">authInterceptor,      <span className="text-purple-400">// Step 88</span></p>
            <p className="text-gray-300 ml-8">errorHandlerInterceptor, <span className="text-purple-400">// Step 90</span></p>
            <p className="text-gray-300 ml-8">loadingInterceptor    <span className="text-purple-400">// Step 91</span></p>
            <p className="text-gray-300 ml-4">])</p>
            <p className="text-green-400">)</p>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Interceptors run in registration order. Response travels back in reverse order.
          </p>
        </div>

        {/* Step 91: Loading Interceptor Code */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 91: Loading Interceptor</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-green-400">export const loadingInterceptor: HttpInterceptorFn = (req, next) =&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">loadingService.isLoading$.next(true);</p>
            <p className="text-gray-300 ml-4">return next(req).pipe(</p>
            <p className="text-purple-400 ml-8">// finalize runs on complete OR error</p>
            <p className="text-gray-300 ml-8">finalize(() =&gt; loadingService.isLoading$.next(false))</p>
            <p className="text-gray-300 ml-4">);</p>
            <p className="text-green-400">{'}'};</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Interceptors run in registration order (request) and reverse (response)</li>
            <li>Use <code>finalize</code> to hide loading spinner - runs on complete OR error</li>
            <li>Auth interceptor clones request and adds Authorization header</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterceptorsDemo;
