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
  @Input() config: CheckboxConfig = {
    label: { text: null },
    input: { options: [] }
  };
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
  @Input() config: RadioConfig = {
    label: { text: null },
    input: { name: null, options: [] }
  };
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
  @Input() config: DropdownConfig = {
    label: { text: null },
    input: { name: null, options: [] }
  };
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();

  otherSelected: boolean;
}

export class DropdownConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; emptyOption?: boolean; otherOption?: boolean; options: { value: string; text: string; }[] };
}






@Component({
  selector: 'datatable',
  template: `
  <button *ngIf="config.action.button.add.enable" class="btn btn-default btn-sm" [innerHtml]="config.action.button.add.text"></button>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th *ngFor="let header of config.headers" [innerHtml]="header.text"></th>
        <th *ngIf="config.action.enable" [innerHtml]="config.action.text"></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of dataset; let row = index;" (click)="focusOnRow(row);">
        <td *ngFor="let head of config.headers" [innerHtml]="data[head.key]"></td>
        <td *ngIf="config.action.enable === true">
          <div *ngIf="config.action.button.style ==='buttons'">
            <a *ngIf="config.action.button.view.enable" class="btn btn-default btn-xs"><i class="fa fa-eye"></i></a>
            <a *ngIf="config.action.button.edit.enable" class="btn btn-default btn-xs"><i class="fa fa-pencil"></i></a>
            <a *ngIf="config.action.button.delete.enable" class="btn btn-default btn-xs" data-toggle="modal" data-target="#deleteRowModal"><i class="fa fa-times"></i></a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modal fade" id="deleteRowModal" tabindex="-1" role="dialog" aria-labelledby="deleteRowModalLabel">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="deleteRowModalLabel">Warning</h4>
        </div>
        <div class="modal-body">
          <p [innerHtml]="config.action.button.delete.message"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning" data-dismiss="modal" (click)="deleteRow()">Delete</button>
        </div>
      </div>
    </div>
  </div>

  `
})
export class DatatableComponent{
  @Input() config: DatatableConfig = {
    headers: [], action: { enable: false }
  };
  @Input() dataset: any [];

/**
 * This property will contain the 
 * row. Can only be set when the 
 * user clicks on the row
 */private row: number;

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */focusOnRow(row: number) {
    this.row = row;
  };

/**
 * Deletes the row in focus from the dataset
 */deleteRow() {
    this.dataset.splice(this.row, 1);
  }
}


export class DatatableConfig {
  headers: { 
    key: string; 
    text: string; 
  } [];
  action: {
    enable: boolean;
    text?: string;
    button?: {
      add: { enable: boolean; text: string; };
      style?: string; //dropdown / buttons
      view?: { enable: boolean };
      edit?: { enable: boolean };
      delete?: { 
        enable: boolean; 
        message?: string;
      };
    }
  };
};
// tslint:disable-next-line:max-line-length
