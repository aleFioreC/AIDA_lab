import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-section',
  templateUrl: './private-section.component.html',
  styleUrls: ['./private-section.component.css']
})
export class PrivateSectionComponent implements OnInit {


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
        this.router.navigate(['/settings'], { state: res })
      } else {
        if (user.username) {
          this.showError1 = true;
        } else {
          this.showError2 = true;
        }
        this.username = ""
        this.password = ""
      }
    })
  }

}
