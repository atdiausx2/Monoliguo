import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
// this class name would be better User as it contains "user/data"
export class HeroesListComponent implements OnInit {

  userDifficulty: String|undefined; 
  userName: String |undefined; 
  // i. e. not assigned a value
  userPassword: String| undefined;

  // constructor(private service: ) { }

  ngOnInit() {
    this.userName = "example_user"
      // this.get | undefined; 
    this.userPassword = "example_password"
    // String| undefined;
    // this.userDifficulty = 
    //  String | undefined; 
   }



  //  getUserDifficulty(){ 
  //   this.
  //  }
}
