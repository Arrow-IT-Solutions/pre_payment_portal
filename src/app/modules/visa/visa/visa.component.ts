import { AfterViewInit, Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { LocalService } from 'src/app/shared/service/local.service';
import { SubjectsService } from 'src/app/shared/service/subjects.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class VisaComponent implements AfterViewInit  {
  constructor(public translate:TranslateService,public layoutService:LayoutService,@Inject(DOCUMENT) private document: Document,private route: ActivatedRoute){}

  ngOnInit(){}

  ngAfterViewInit(): void {
    this.configureCheckout();
  }
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


  configureCheckout() {


    
    // Get Session From Url

    var sessionID;
    this.route.queryParamMap.subscribe(params => {
      sessionID = params.get('session'); 
      console.log(sessionID);
    });


    console.log("SessionID : ",sessionID );



    // Error callback function
    (window as any)['errorCallback'] = (error : any) => {
      console.log(JSON.stringify(error));
    };

    // Cancel callback function
    (window as any)['cancelCallback'] = () => {
      console.log('Payment cancelled');
    };
   
    
    
     // Configure checkout
     if ((window as any)['Checkout']) {

      (window as any)['Checkout'].configure({
        session: {
          id: sessionID
        }
      });
     
    }

   
  }


  showPaymentPag2() {




    if ((window as any)['Checkout']) {
      (window as any)['Checkout'].showPaymentPage();
    }
  }




}
