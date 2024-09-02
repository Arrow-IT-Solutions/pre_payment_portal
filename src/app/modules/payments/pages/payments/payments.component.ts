import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaymentRequest, PaymentResponse, PaymentUpdateRequest, PaymentSearchRequest } from '../../payments.module';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { PaymentService } from 'src/app/Core/services/payment.service';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class PaymentsComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  
  btnLoading: boolean = false;
  loading: boolean = false;
  data: PaymentResponse[] = [];
 
  pageSize: number = 12;
  totalRecords: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  

  selectedCurrency: string | null = null;
  

  isResetting: boolean = false;
 currency=Array.from(["JOD","USD"]);
 showCopyAlert: boolean = false;
OnCopyLink(){
  this.showCopyAlert=true;
  setTimeout(() => {
    this.showCopyAlert = false;
  }, 2000);
}
 
  constructor(public layoutService: LayoutService, public paymentService: PaymentService, public messageService: MessageService, public confirmationService: ConfirmationService, public formBuilder: FormBuilder, public translate: TranslateService) {
    this.dataForm = this.formBuilder.group({
      currency: ['', Validators.required],
      name:['',Validators.required],
      value:['',Validators.required]
      

    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async ngOnInit() {
    
    await this.FillData();
  }

  Search() {
    this.FillData();
  }



 

  confirmDelete(row: PaymentResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.paymentService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;

    this.data = [];
    this.paymentService.SelectedData = null;
    

    let filter: PaymentSearchRequest = {
      includeDriver: '1',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString()
    };
    const response = (await this.paymentService.Search(filter));

    if (response.data == null || response.data.length == 0) {
      this.data = [];
    
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
     
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

 

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }

  paginate(event: any) {
    this.FillData(event.pageIndex);
  }


  async onSubmit() {
    try {
      this.btnLoading = true;

      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }

      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {
    let response;
    

    if (this.paymentService.SelectedData != null) {
      // update

      var driver: PaymentUpdateRequest = {
        
        
        
        
        currency: this.dataForm.controls['currency'].value.toString(),
       name:this.dataForm.controls['name'].value.toString(),
       value:this.dataForm.controls['value'].value.toString()
      };

      response = await this.paymentService.Update(driver);
    } else {
      // add
      var payment: PaymentRequest = {
        currency: this.dataForm.controls['currency'].value.toString(),
        name:this.dataForm.controls['name'].value.toString(),
        value:this.dataForm.controls['value'].value.toString()

        
      };

      response = await this.paymentService.Add(payment);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      
      this.resetForm();
      this.FillData();

    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }
  resetForm() {
    this.dataForm.reset();
  }

  copyLink( url : string) {
    if(url == "")
      return;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Link copied to clipboard!');
      // alert('copied successfuly!')
      this.OnCopyLink();
      
      
      
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
