import { animate, style, transition, trigger } from '@angular/animations';

export interface NavbarData {
  routeLink?: string | '';
  icon?: string;
  label?: string;
  labelar?: string;
  expanded?: boolean;
  id?: string;
  idhash?: string;
  char?: string;
  items?: NavbarData[];
}

export const navbarData: NavbarData[] = [

  {
    label: 'Payments',
    labelar : 'الدفعات',
    id: 'Payments',
    icon: 'receipt_long',
    routeLink :"payments"
  },
 

];
