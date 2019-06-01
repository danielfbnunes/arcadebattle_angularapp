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
  // for picture uploading
  reader: any;
  imageSrc = '';

  constructor(private arcadeBattleService: ArcadebattleService) { }

  ngOnInit() {
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    this.reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.reader.onload = this._handleReaderLoaded.bind(this);
    this.reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    this.reader = e.target;
    this.imageSrc = this.reader.result;
  }

  addGame(photo: any) {
    this.data = {};
    this.data.name = this.name;
    this.data.preview_link = this.previewLink;
    this.data.photo_b64 = this.imageSrc.split(',')[1];

    this.arcadeBattleService.add_game(this.data).subscribe(data => console.log(data));

  }

}
