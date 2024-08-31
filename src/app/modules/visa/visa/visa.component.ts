import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { LocalService } from 'src/app/shared/service/local.service';
import { SubjectsService } from 'src/app/shared/service/subjects.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class VisaComponent {
  constructor(public translate:TranslateService,public layoutService:LayoutService,@Inject(DOCUMENT) private document: Document){}

  ngOnInit(){}

  // ToTranslate(event:any){
  //   this.translate.use(event.target.value)
  // }

  changeLang(event:any)
  {
     console.log("current Lang : ",event.target.value);

    if(event.target.value == 'en')
    {
      this.layoutService.config = 
      {
        dir : 'ltr',
        lang : 'en'
      }

    }
    else if( event.target.value == 'ar')
    {
      this.layoutService.config = 
      {
        dir : 'rtl',
        lang : 'ar'
      }
    }

    localStorage.setItem('lang', this.layoutService.config.lang);
    localStorage.setItem('dir', this.layoutService.config.dir);
    this.document.documentElement.lang = this.layoutService.config.lang;

     window.location.reload();
  }




}
