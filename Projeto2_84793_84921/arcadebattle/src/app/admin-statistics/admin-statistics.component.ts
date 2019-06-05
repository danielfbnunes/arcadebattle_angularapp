import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {

  admin: any;

  imagePath: any;

  constructor(private arcadeBattleService: ArcadebattleService, private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAdmin();
  }

  getAdmin(): void {
    const email = this.route.snapshot.paramMap.get('email');
    this.arcadeBattleService.get_profile(email)
        .subscribe(
            data => {
              this.admin = data.data;
              this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                  + this.admin.photo_b64);
            });
  }

}
