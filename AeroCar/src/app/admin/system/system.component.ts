import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  providers: [SystemService]
})
export class SystemComponent implements OnInit {

  constructor(private systemService: SystemService, private router: Router) { }

  ngOnInit(): void {
    var ret = this.systemService.isSystemAdmin();

    ret.subscribe(data => {
      if (data.status != 200) this.router.navigateByUrl("");
    },
    err => {
      this.router.navigateByUrl("");
    });
  }

}
