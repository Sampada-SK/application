import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from '../no-whitespace.validator';
import { Router } from '@angular/router';
import { CrudserviceService } from '../crudservice.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  UserForm: FormGroup;
  userCreated = false;
  userEdited = false;
  userDeleted = false;
  userDeletedId;
  editUserForm: FormGroup;
  showEditUserForm = false;
  editFormId;
  userData;
  submitted: any;
  @ViewChild('deletemodal', { static: false }) delModal;
  constructor(private formBuilder: FormBuilder,public fb: FormBuilder,
    private router: Router,
    public crudService: CrudserviceService) { }

  ngOnInit() {

   this.UserForm = this.formBuilder.group({
      id: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Ename: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      username: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      email:  ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      // address: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      company: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      website: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      phone: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],

    });
    this.GetAllEmployee();
  }
  GetAllEmployee(){
    this.crudService.getUserData().subscribe((data) => {
      console.log('data', data);
      this.userData = data;
    });

  }
  get user() {
    return this.UserForm.controls;
  }

  createUser(event, UserForm) {
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }
    const userData = UserForm.value;
    this.crudService.createUser(userData).subscribe((data) => {
      console.log('Employee created', data);
      this.userCreated = true;
      setTimeout(() => {
        this.userCreated = false;
      }, 2000);
    });
    this.GetAllEmployee();
  }

  editUser(event, data) {
    this.showEditUserForm = true;
    this.editFormId = data.id;
    this.editUserForm = this.formBuilder.group({
      id: [data.id],
      name: [data.Ename],
      username: [data.username],
      email: [data.email],
      // address: [data.address],
      company: [data.company],
      website: [data.website],
      phone: [data.phone],
    });
  }

  editUserData(event, UserForm) {
    const userData = UserForm.value;
    this.crudService.editUser(userData).subscribe((data) => {
      console.log('Employee edited', data);
      this.userEdited = true;
      setTimeout(() => {
        this.userEdited = false;
        this.showEditUserForm = false;
      }, 2000);
    });
    this.GetAllEmployee();
  }

  deleteuser(userData) {

    this.delModal.show();
    this.userDeletedId = userData.id;
    // this.deleteUserData(userData);
  }

  deleteUserData(userData) {
    this.crudService.deleteUser(userData).subscribe((data) => {
      console.log('Employee deleted', data);
      // this.userDeletedId = userData.id;
      this.userDeleted = true;
      this.delModal.hide();
      setTimeout(() => {
        this.userDeleted = false;
      }, 2000);
    });
  }
}
