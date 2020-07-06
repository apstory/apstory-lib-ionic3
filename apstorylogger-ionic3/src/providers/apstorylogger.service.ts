import { Injectable, Inject } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';

@Injectable()
export class ApstoryloggerService {

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: this.instrumentationKey,
      loggingLevelConsole: this.loggingLevelConsole
    }
  });

  constructor(@Inject('instrumentationKey') private instrumentationKey: string,
              @Inject('loggingLevelConsole') private loggingLevelConsole: number = 0) {
    this.appInsights.loadAppInsights();
  }

  logTrace(message: string, properties?: any, severityLevel?: any, measurements?: any) {
    this.appInsights.trackTrace({ message, severityLevel, properties, measurements });
  }

  async logTraceSeverity(message: string, loggerSeverity: LoggerSeverityEnum) {
    this.logTrace(message, null, loggerSeverity);
  }

  logPageView(
    name?: string, uri?: string, measurements?: any, properties?: any, duration?: number, isLoggedIn?: boolean,
    pageType?: string
  ) {
    this.appInsights.trackPageView({ name, uri, measurements, properties, isLoggedIn, pageType });
    this.logEvent(name, 'Initialize page');
    this.logTrace(name);
  }

  logEvent(name: string, properties?: any, measurements?: any) {
    this.appInsights.trackEvent({ name, properties, measurements });
    this.logTrace(name);
  }

  logException(exception: Error, handledAt?: string, properties?: any, measurements?: any, severityLevel?: any, id?: string) {
    this.appInsights.trackException({ exception, properties, measurements, severityLevel, id });
  }

}
