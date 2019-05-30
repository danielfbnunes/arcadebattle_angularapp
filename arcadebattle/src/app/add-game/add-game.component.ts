import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  name = 'CS-GO';
  previewLink = 'https://www.youtube.com/embed/edYCtaNueQY';
  /*
  name: any;
  previewLink: any;
   */

  data: any;

  constructor(private arcadeBattleService: ArcadebattleService) { }

  ngOnInit() {
  }

  addGame(photo: any) {
    this.data = {};
    this.data.name = this.name;
    this.data.preview_link = this.previewLink;

    const file = photo.files[0];
    const myReader = new FileReader();

    myReader.onloadend = (e) => {
      this.data.photo_b64 = myReader.result.slice(22);
    }
    myReader.readAsDataURL(file);

    this.arcadeBattleService.add_game(this.data).subscribe(data => console.log(data));

  }

}
