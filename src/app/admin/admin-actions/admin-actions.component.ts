import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IActionResponce } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent {

  public adminActions: IActionResponce[] = [];
  public actionForm!: FormGroup;
  
  public editId!: number;
  public editStatus: boolean = false;
  public formStatus: boolean = false;

  public uploadPercent!: number;
  public isUploaded: boolean = false;

  constructor(
    private actionsService: ActionsService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllActions();
    this.initActionForm();
  }

  openForm(): void{
    this.formStatus = !this.formStatus;
    this.actionForm.patchValue({
      name: "",
      description: "",
      imagePath: ""
    })
  }

  initActionForm(): void{
    this.actionForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getAllActions(): void {
    this.actionsService.getAll().subscribe(data => {
      this.adminActions = data;
    })
  }

  addAction(): void {
    if(this.editStatus) {
      this.actionsService.updateAction(this.actionForm.value, this.editId).subscribe(() => {
        this.getAllActions();
        this.toastr.success('The action has been successfully changed');
      })
    } else {
      this.actionsService.createAction(this.actionForm.value).subscribe(() => {
        this.getAllActions();
        this.toastr.success('The action has been created successfully');
      })
    }
    this.editStatus = false;
    this.formStatus = false;
    this.isUploaded = false;
  }

  editAction(action: IActionResponce): void {
    this.formStatus = true;
    this.actionForm.patchValue({
      date: action.date,
      name: action.name,
      description: action.description,
      imagePath: action.imagePath
    });
    this.editStatus = true;
    this.editId = action.id;
    this.isUploaded = true;
  }

  deleteAction(action: IActionResponce): void {
    if (confirm('Are you sure?')) {
      this.actionsService.deleteAction(action.id).subscribe(() => {
        this.getAllActions();
        this.toastr.success('The action has been successfully removed');
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  };

  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value;
  };

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.actionForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  };  
}
