import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneDirective]'
})
export class PhoneDirective {
  regexStr = '^[0-9]';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event:any) {
    const input = event.target;
    const valor = input.value.replace(/\D/g, '');
    const match = valor.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      input.value = '(' + match[1] + ')' + match[2] + '.' + match[3] + '-' + match[4];
    } else {
      input.value = '';
    }
  }
}
