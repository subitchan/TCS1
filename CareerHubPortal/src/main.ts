import { bootstrapApplication } from '@angular/platform-browser';
import { App} from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  ...appConfig, // ✅ Spread your app-level config
  providers: [
    provideAnimations(),
    ...appConfig.providers,     // 🧠 Spread existing providers from appConfig
    provideHttpClient(withInterceptors([authInterceptor]))         // ✅ Add additional providers like HTTP
  ]
});