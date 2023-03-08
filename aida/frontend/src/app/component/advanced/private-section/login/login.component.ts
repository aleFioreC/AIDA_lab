import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  showError1: boolean = false;
  showError2: boolean = false;

  constructor(private service: GeneralService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    let user = {
      username: this.username,
      password: this.password,
    }
    this.service.login(user).subscribe((res: any) => {
      this.showError1 = false;
      this.showError2 = false;
      if (res) {
        this.router.navigate(['private'], { state: { user: res } });
      }
    })
  }


}
