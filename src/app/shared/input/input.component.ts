import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;

  input: any;

  //Injetar referencia baseada no componente 
  //que vai passar informação p esse input
  @ContentChild(NgModel) model: NgModel;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  //vai ser chamado após o conteúdo do componente
  //ser definido
  ngAfterContentInit() {
    this.input = this.model || this.control
    
    if(this.input === undefined){
      throw new Error('Diretiva ngModel ou FormControlName necessária para usar esse componente');
    }
  };

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched);
  };

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched);
  };

}
