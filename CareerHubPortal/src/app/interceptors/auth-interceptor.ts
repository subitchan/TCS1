import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ignore requests that contain 'auth' in the URL
  if (req.url.includes('auth')) {
    return next(req); // Don't add token or extra headers
  }

  const token = localStorage.getItem('token');

  // Set headers
  let headers: { [name: string]: string } = {
    'ngrok-skip-browser-warning': 'true'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const authReq = req.clone({ setHeaders: headers });
  return next(authReq);
};
