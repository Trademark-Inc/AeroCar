import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class CarsProfileComponent implements OnInit {

  id: any;
  profileDetails: any;

  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router, private zone: NgZone) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadProfileData();
   }

  ngOnInit(): void {
  }

  loadProfileData(): void {
    var ret = this.carService.getCompany(this.id);
    
    ret.subscribe(data => {
        this.zone.run(() => { 
          this.profileDetails = data.body["carCompanyProfileDTO"]
      });
      },
      err => {
      });
  }
  
  getVehicleTypeText(vehicleType: any): any {
    switch (vehicleType) {
      case 0: return "HatchBack";
      case 1: return "Sedan";
      case 2: return "Coupe";
      case 3: return "SUV";
    }

    return "Unknown";
  }
}
