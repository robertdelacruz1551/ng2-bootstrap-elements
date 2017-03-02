import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
/**
 * The textbox component requires a 
 * configuratoin object passed to it.
 * 
 * use:
 *  <textbox 
 *    [config]="configuration" 
 *    [bind]="textProperty" 
 *    (propertyUpdate)="textProperty=$event">
 *  </textbox>
 */
@Component({
  selector: 'textbox',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <input *ngIf="!config.input.readonly && !config.input.placeholder" type="text" class="form-control input-sm" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
      <input *ngIf="!config.input.readonly && config.input.placeholder" type="text" class="form-control input-sm" [name]="config.input.name"[placeholder]="config.input.placeholder" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
      <input *ngIf="config.input.readonly" type="text" class="form-control" [id]="config.input.id" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)" readonly>
    </div>
  </div>
  `
})
export class TextboxComponent {
  @Input() config: TextBoxConfig = {
    label: { text: null },
    input: { name: null }
  };
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();
  
}

export class TextBoxConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; placeholder?: string };
}






@Component({
  selector: 'checkbox',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <div *ngFor="let option of config.input.options" class="checkbox">
        <label><input type="checkbox" [name]="option.name" [value]="option.value" [checked]="isChecked(option.value)" (change)="updateArray(option.value, $event.target.checked)">{{option.text}} </label>
      </div>
    </div>
  </div>
  `
})
export class CheckboxComponent {
  @Input() config: CheckboxConfig;
  @Input() bind: any [];

  updateArray(value, checked) {
    if( checked ) { 
      this.bind.push(value)
    }else if( !checked ) {
      let i = this.bind.indexOf(value, 1);
      this.bind.splice(i);
    }
  }

  isChecked(value): boolean {
    if(this.bind.indexOf(value) === -1) {
      return false;
    } else { return true; };
  }
}

export class CheckboxConfig {
  label: { text: string; };
  input: { readonly?: boolean; options: { name?: string; value: any; text: string }[]; };
}







@Component({
  selector: 'radio',
  template: `
   <div class="form-horizontal form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <div *ngFor="let option of config.input.options" class="radio">
        <label class="disable"><input type="radio" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)" [value]="option.value"> {{option.text}} </label>
      </div>
    </div>
  </div>
  `
})
export class RadioComponent {
  @Input() config: RadioConfig;
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();
}

export class RadioConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: string; text: string; } []};
}






@Component({
  selector: 'dropdown',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <select *ngIf="!config.input.readonly" class="form-control input-sm" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
        <option *ngIf="config.input.emptyOption" value=""></option>
        <option *ngFor="let option of config.input.options" [value]="option.value" [innerHtml]="option.text"></option>
        <option *ngIf="config.input.otherOption" value="other">Other</option>
      </select>
    </div>
  </div>
  `
})
export class DropdownComponent {
  @Input() config: DropdownConfig;
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();

  otherSelected: boolean;
}

export class DropdownConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; emptyOption?: boolean; otherOption: boolean; options: { value: string; text: string; }[] };
}


// tslint:disable-next-line:max-line-length
