import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CorporateService } from '../../../services/corporate.service';
import { AboutUs } from '../../../models/aboutUs';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.css'
})
export class CorporateComponent {
  aboutUs: AboutUs ;
  loading = false;
  constructor(
    private corporateService: CorporateService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.getAboutUs();
    this.setMetaTags();
  }

  getAboutUs() {
    this.loading = true;
    this.corporateService.getAboutUs().subscribe(response=>{
      console.log(response)
      this.aboutUs=response
    })
  }
  setMetaTags() {
    this.title.setTitle('Hakkımızda | Şirket Adı');
    this.meta.updateTag({ name: 'description', content: 'Şirketimiz hakkında detaylı bilgi edinin.' });
  }
}
