import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../shared/services/tmdb/tmdb.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
  standalone: false
})
export class DetailsPageComponent implements OnInit {

  public id:any = 0; 
  public type:any = "movie";
  public mediaData:any;

  constructor(private route: ActivatedRoute, private _tmdbService: TmdbService){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');

    this._tmdbService.getMediaDataAsync(this.id,this.type).subscribe({
      next: (response) => {
        this.mediaData = response;
      },
      error: (error) => {
        //TO DO
      }
    })
  }

}
