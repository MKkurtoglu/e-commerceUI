import { Component } from '@angular/core';
import { Contact } from '../../../models/contact';
import { CorporateService } from '../../../services/corporate.service';
import { Meta, Title } from '@angular/platform-browser';
import { concatMapTo } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: Contact | null = null;

  constructor(
    private corporateService: CorporateService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.getContact();
    this.setMetaTags();
  }

  getContact() {
    this.corporateService.getContact().subscribe(response => {
      if(response) {
        this.contact = response;
        console.log(this.contact)
      }
    });
  }

  setMetaTags() {
    this.title.setTitle('İletişim | Şirket Adı');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Bizimle iletişime geçin. İletişim bilgilerimiz ve adresimiz.' 
    });
  }
}
