import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/services/translate.pipe';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports:[TranslatePipe]
})
export class Home {

  constructor(translationService: TranslationService) {

  }
}
