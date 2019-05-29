import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArcadebattleService} from '../arcadebattle.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-statistics',
  templateUrl: './doctor-statistics.component.html',
  styleUrls: ['./doctor-statistics.component.css']
})
export class DoctorStatisticsComponent implements OnInit {

  doctor: any;

  imagePath: any;

  constructor(private arcadeBattleService: ArcadebattleService, private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor(): void {
    const email = this.route.snapshot.paramMap.get('email');
    this.arcadeBattleService.get_profile(email)
        .subscribe(
        data => {
          this.doctor = data.data;
          this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
              + this.doctor.photo_b64);
        });
  }
}
