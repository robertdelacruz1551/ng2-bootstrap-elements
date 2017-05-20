import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
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
    <div [ngClass]="(!config.input.size || config.input.size == 'large' || config.input.size == '8' )?'col-sm-8': { 'small' : 'col-sm-2', 'medium' : 'col-sm-4', '1' : 'col-sm-1', '2' : 'col-sm-2', '3' : 'col-sm-3', '4' : 'col-sm-4', '5' : 'col-sm-5', '6' : 'col-sm-6', '7' : 'col-sm-7' }[config.input.size]">
      <input *ngIf="!config.input.readonly && !config.input.placeholder" type="text" class="form-control input-sm" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
      <input *ngIf="!config.input.readonly && config.input.placeholder" type="text" class="form-control input-sm" [name]="config.input.name"[placeholder]="config.input.placeholder" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
      <input *ngIf="config.input.readonly" type="text" class="form-control" [id]="config.input.id" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)" readonly>
    </div>
  </div>
  `,
  styles: [`
  .form-group, .form-control {
    font-size: 11px;
  }
  `]
})
export class TextboxComponent {
  @Input() config: TextBoxConfig;
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();
}

export class TextBoxConfig {
  label: { text?: string; };
  input: { readonly?: boolean; name: string; placeholder?: string; size?: string; };
}






@Component({
  selector: 'checkbox',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <div *ngFor="let option of config.input.options" class="checkbox">
        <label>
          <input type="checkbox" [name]="option.name" [value]="option.value" [checked]="isChecked(option.value)" (change)="updateArray(option.value, $event.target.checked)">
          {{option.text}}
        </label>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .form-group {
    font-size: 11px;
  }
  `]
})
export class CheckboxComponent {
  @Input() config: CheckboxConfig;
  @Input() bind: any [];

  updateArray(value, checked) {
    if( checked ) { 
      this.bind.push(value)
    }else if( !checked ) {
      let i = this.bind.indexOf(value);
      this.bind.splice(i, 1);
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
        <label>
          <input type="radio" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)" [value]="option.value"> 
          {{option.text}}
        </label>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .form-group {
    font-size: 11px;
  }
  `]
})
export class RadioComponent {
  @Input() config: RadioConfig;
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();
}

export class RadioConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: any; text: string; } []};
}






@Component({
  selector: 'dropdown',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div [ngClass]="(!config.input.size || config.input.size == 'large' || config.input.size == '8' )?'col-sm-8': { 'small' : 'col-sm-2', 'medium' : 'col-sm-4', '1' : 'col-sm-1', '2' : 'col-sm-2', '3' : 'col-sm-3', '4' : 'col-sm-4', '5' : 'col-sm-5', '6' : 'col-sm-6', '7' : 'col-sm-7' }[config.input.size]">
      <select *ngIf="!config.input.readonly" class="form-control input-sm" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="propertyUpdate.emit(this.bind)">
        <option *ngIf="config.input.emptyOption" value=""></option>
        <option *ngFor="let option of config.input.options" [value]="option.value" [innerHtml]="option.text"></option>
        <option *ngIf="config.input.otherOption" value="other">Other</option>
      </select>
    </div>
  </div>
  `,
  styles: [`
  .form-group, .form-control {
    font-size: 11px;
  }
  `]
})
export class DropdownComponent {
  @Input() config: DropdownConfig;
  @Input() bind: string;
  @Output() propertyUpdate = new EventEmitter();

  otherSelected: boolean;
}

export class DropdownConfig {
  label: { text: string; };
  input: { readonly?: boolean; size?: string; name: string; emptyOption?: boolean; otherOption?: boolean; options: { value: string; text: string; }[] };
}



@Component({
  selector: 'datatable',
  template: `
  <table class="table table-hover table-bordered datatable" [id]="datasetId">
    <thead>
      <tr>
        <th *ngIf="config.action.enable">
          <div class="btn-group">
            <span class="glyphicon glyphicon-th-list" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-hidden="true"></span>
            <ul class="dropdown-menu">
              <li *ngIf="!allSelected"><a (click)="selectAll()">Select All</a></li>
              <li *ngIf="allSelected" ><a (click)="deselectAll()">Deselect All</a></li>
                <li role="separator" class="divider"></li>
              <li *ngIf="config.action.button.add.enable  && config.action.button.add.modal" ><a data-toggle="modal" [attr.data-target] = "'#addmodal'  + datasetId" >Add</a></li>
              <li *ngIf="config.action.button.view.enable && config.action.button.view.modal"><a data-toggle="modal" [attr.data-target] = "'#viewmodal' + datasetId + row">View</a></li>
              <li *ngIf="config.action.button.edit.enable && config.action.button.edit.modal"><a  data-toggle="modal" [attr.data-target] = "'#editmodal' + datasetId + row">Edit</a></li>
              <li *ngIf="config.action.button.delete.enable"><a data-toggle="modal" [attr.data-target]="'#' + deleteModalId">Delete</a></li>
            </ul>
          </div>
        </th>
        <th *ngFor="let header of config.headers"  [innerHtml]="header.text"></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of dataset; let row = index;">
        <td *ngIf="config.action.enable === true">
          
          <input type="checkbox" [value]="row" [checked]="allSelected" (change)="rowSelectionChange(row, $event.target.checked);">

          <datatable-modal *ngIf="config.action.button.view.enable && config.action.button.view.modal"
            [id]="'viewmodal' + datasetId + row"
            [datarow]="data"
            [config]= "config.action.button.view.modal"
          ></datatable-modal>

          <datatable-modal *ngIf="config.action.button.edit.enable && config.action.button.edit.modal"
            [id]="'editmodal' + datasetId + row"
            [datarow]="data"
            [config]= "config.action.button.edit.modal"
            (commit)= "dataset[row] = $event"
          ></datatable-modal>

        </td>
        <td *ngFor="let head of config.headers" [innerHtml]="data[head.key]"></td>
      </tr>
    </tbody>
  </table>

  <datatable-modal *ngIf="config.action.button.add.enable && config.action.button.add.modal" 
    [id]="'addmodal' + datasetId"
    [datarow]="{}"
    [config]= "config.action.button.add.modal"
    (commit)= "dataset.push($event)"
  ></datatable-modal>
  
  <div class="modal fade" [id]="deleteModalId" tabindex="-1" role="dialog" aria-labelledby="deleteRowModalLabel">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="deleteRowModalLabel">Warning</h4>
        </div>
        <div class="modal-body">
          <p>Delete the selected records?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-action" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning btn-action" data-dismiss="modal" (click)="deleteRow()">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .datatable > tbody > tr > td, .datatable > thead > tr > th, .datatable > tbody > tr > th, .datatable > tfoot > tr > th, .datatable > thead > tr > td{
    padding: 5px;
    vertical-align: middle;
    font-size: 11px;
  }
  .datatable .btn{
    margin-bottom: 0px;
  }
  `]
}) // <input type="checkbox" [checked]="allSelected" [name]="datasetId + row" [value]="row" (change)="selectedRow(data); focusOnRow(row);">
export class DatatableComponent {
  @Input() config: DatatableConfig = {
    headers: [], action: { enable: false }
  };
  @Input() dataset: any [];
/**
 * if the user clicks on selected all then set all 
 * the checkboxes in the table to checked
 */private allSelected: boolean;

  selectAll() {
    this.allSelected = true;
    this.dataset.forEach(row => {
      this.selectedRow(row);
    });
  };

  deselectAll() {
    this.allSelected = false;
    this.rowsSelected = [];
  };
/**
 * The unique identifier for the dataset
 */private datasetId = Math.random().toString(36).substring(7); 

/**
 * This property will have the modal key 
 * to delete records from the datatable
 */private deleteModalId = Math.random().toString(36).substring(7);

/**
 * This property will contain the 
 * row. Can only be set when the 
 * user clicks on the row
 */private row: number;

/**
 * This property is an array 
 * containing the rows selected
 */private rowsSelected: any [] = [];

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */rowSelectionChange(row: number, state: boolean ) {
    var data = this.dataset[row];
    this.selectedRow(data);
    
    if(state) {
      this.row = row;
    } else {
      this.row = null;
    }
  };

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */selectedRow(data: any) {
    if(this.rowsSelected.indexOf(data) == -1) {
      this.rowsSelected.push(data);
    }else{
      this.rowsSelected.splice(this.rowsSelected.indexOf(data), 1);
    };
  };

/**
 * Deletes the row in focus from the dataset
 */deleteRow() {
    this.rowsSelected.forEach(row => {
      this.dataset.splice(this.dataset.indexOf(row), 1);
    });
    this.allSelected = false;
  };
}


export class DatatableConfig {
  headers: { 
    key: string; 
    text: string; 
  } [];
  action: {
    enable: boolean;
    button?: {
      add?:  { enable: boolean; modal: DatatableModalConfig; };
      view?: { enable: boolean; modal: DatatableModalConfig; };
      edit?: { enable: boolean; modal: DatatableModalConfig; };
      delete?: { enable: boolean; message?: string; };
    }
  };
};


@Component({  
  selector: 'datatable-modal',
  template: `
  <div class="modal fade" [id]="id" tabindex="-1" role="dialog" [attr.aria-labelledby]="config.labelBy">
    <div [ngClass]="(!config.size)? 'modal-dialog': { 'small' : 'modal-dialog modal-sm', 'large' : 'modal-dialog modal-lg'}" role="document">
      <div class="modal-content">
        <div *ngIf="config.header.enable" class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" [id]="config.labelBy" [innerHtml]="config.header.text"></h4>
        </div>
        <div class="modal-body">
          <div *ngIf="config.form.message">
            <h3 [innerHtml]="config.form.message.heading"></h3>
            <p [innerHtml]="config.form.message.text"></p>
          </div>
          <div class="form-horizontal">
            <div *ngFor="let element of config.form.elements">

              <textbox  *ngIf="element.type === 'textbox'"  
                [config]="element[element.type].config" 
                [bind]="editableDatarow[element[element.type].bind]" 
                (propertyUpdate)="editableDatarow[element[element.type].bind] = $event"
              ></textbox>

              <checkbox *ngIf="element.type === 'checkbox'" 
                [config]="element[element.type].config" 
                [bind]="editableDatarow[element[element.type].bind]"
              ></checkbox>

              <radio *ngIf="element.type === 'radio'"    
                [config]="element[element.type].config" 
                [bind]="editableDatarow[element[element.type].bind]" 
                (propertyUpdate)="editableDatarow[element[element.type].bind] = $event"
              ></radio>

              <dropdown *ngIf="element.type === 'dropdown'" 
                [config]="element[element.type].config" 
                [bind]="editableDatarow[element[element.type].bind]" 
                (propertyUpdate)="editableDatarow[element[element.type].bind] = $event"
              ></dropdown>

            </div>
          </div>
        </div>
        <div *ngIf="config.footer.enable" class="modal-footer">
          <button (click)="cancelChange()" type="button" class="btn btn-default btn-action" data-dismiss="modal">Cancel</button>
          <button *ngIf="config.footer.enable" (click)="commit.emit(editableDatarow)" type="button" class="btn btn-warning btn-action" data-dismiss="modal" [innerHtml]="config.footer.commit.text"></button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DatatableModal implements OnInit {
  @Input() id: string;
  @Input() datarow: any;
  @Input() config: DatatableModalConfig;
  @Output() commit = new EventEmitter();
/**
 * Will contain the updated object
 */private editableDatarow: {} = {};

   private setEditableDatarow() {
     this.editableDatarow = JSON.parse(JSON.stringify(this.datarow));
   }
/**
 * If the user cancels the change we 
 * need to reset the updateDatarow object 
 * back to it's unchanged state
 */private cancelChange() {
    this.setEditableDatarow();
  }

/**
 * On init make a copy of the datarow 
 * property to prevent update if user 
 * cancels change.
 */ngOnInit() {
    this.setEditableDatarow();
  }
};

export class DatatableModalConfig {
  labelBy?: string;
  size?: string;
  header: {
    enable: boolean;
    text: string;
  };
  form: {
    message?: {
      heading?: string;
      test?: string;
    },
    elements: {
      type: string; 
      bind: string;
      textbox?: { config: TextBoxConfig };
      checkbox?: { config: CheckboxConfig };
      radio?: { config: RadioConfig };
      dropdown?: { config: DropdownConfig };
    } [];
  };
  footer: {
    enable: boolean;
    commit: {
      text: string;
      enable: boolean;
    }
  }
}
// tslint:disable-next-line:max-line-length



// tslint:disable-next-line:max-line-length
