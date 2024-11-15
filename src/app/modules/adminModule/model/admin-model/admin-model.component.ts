import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../../services/model.service';
import { ToastrService } from 'ngx-toastr';
import { Model } from '../../../../models/model';
import { ModelDto } from '../../../../models/modelDto';

@Component({
  selector: 'app-admin-model',
  templateUrl: './admin-model.component.html',
  styleUrls: ['./admin-model.component.css']
})
export class AdminModelComponent implements OnInit {
  models: ModelDto[] = [];

  constructor(private modelService: ModelService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.modelService.getModels().subscribe(
      response => {
        if (response.isSuccess) {
          this.models = response.data;
          console.log(response.data)
          this.toastrService.success('Modeller Yüklendi');
        }
      },
      error => {
        this.toastrService.error(error.message);
      }
    );
  }

  deleteModel(modelId: number) {
    this.modelService.deleteModel(modelId).subscribe(
      response => {
        if (response.isSuccess) {
          this.models = this.models.filter(model => model.modelId !== modelId);
          this.toastrService.success('Model Silindi');
        }
      },
      error => {
        this.toastrService.error('Model silme başarısız');
      }
    );
  }
}
