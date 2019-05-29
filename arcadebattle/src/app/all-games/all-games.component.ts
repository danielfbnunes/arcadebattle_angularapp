import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  games: object[];
  imagePath: any;

  constructor(private arcadeBattleService: ArcadebattleService, private sanitizer: DomSanitizer) { }

  videoClicked(modal: any, game: any) {
    const theModal = $(modal).data('target');
    const videoSRC = game.preview_link;
    const gameName = game.name;
    const videoSRCauto = videoSRC + '?modestbranding=1&rel=0&controls=1&showinfo=0&html5=1&autoplay=1';
    $(theModal + ' iframe').attr('src', videoSRCauto);
    $('#modalLabel').text(gameName);
  }

  stopVideo(iframe: any) {
    $(iframe).attr('src', '');
  }

  ngOnInit() {
    this.getAllGames();
  }

  getImagePath(g: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, '
        + g.photo_b64);
  }

  getAllGames() {
    this.arcadeBattleService.all_games()
        .subscribe(
            data => {
              this.games = data.data;
            }
        );
  }
}
