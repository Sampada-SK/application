import { Component, OnInit, ViewChild } from '@angular/core';

import { CrudserviceService } from '../crudservice.service';
import { Icrud } from '../icrud';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  users: Icrud[] = [];

  constructor(public crudService: CrudserviceService) { }

  ngOnInit(): void {

    // this.crudService.getAll().subscribe((data: Icrud[])=>{
    //   console.log(data);
    //   this.users = data;
    // })  

   
  }

  // deleteUser(user: Icrud): void {
  //   this.crudService.delete(user.id)
  //     .subscribe( data => {
  //       this.users = this.users;
  //     })
  // };

}
