import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApstoryloggerService } from './providers/apstorylogger.service';

@NgModule({
  declarations: [],
  imports: [ApstoryloggerService],
  exports: []
})
export class ApstoryloggerModule {
  static forRoot(instrumentationKey: string, loggingLevelConsole: number): ModuleWithProviders {
    return {
      ngModule: ApstoryloggerModule,
      providers: [ApstoryloggerService, { provide: 'instrumentationKey', useValue: instrumentationKey },  
                                        { provide: 'loggingLevelConsole', useValue: loggingLevelConsole }]
    };
  }
}
