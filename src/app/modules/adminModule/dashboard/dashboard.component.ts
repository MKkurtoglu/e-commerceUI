import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

/**
 *
 */
constructor() {
  
  
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // readonly #destroyRef: DestroyRef = inject(DestroyRef);
  // readonly #document: Document = inject(DOCUMENT);
  // readonly #renderer: Renderer2 = inject(Renderer2);
  // readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  

  // public mainChart: IChartProps = { type: 'line' };
  // public mainChartRef: WritableSignal<any> = signal(undefined);
  // #mainChartRefEffect = effect(() => {
  //   if (this.mainChartRef()) {
  //     this.setChartStyles();
  //   }
  // });
  // public chart: Array<IChartProps> = [];
  // public trafficRadioGroup = new FormGroup({
  //   trafficRadio: new FormControl('Month')
  // });

  // ngOnInit(): void {
  //   this.initCharts();
  //   this.updateChartOnColorModeChange();
  // }

  // //grafiklerin ilk olarak yüklenmesi ve verilere dayalı olarak ayarlanmasını sağlıyor
  // initCharts(): void {
  //   this.mainChart = this.#chartsData.mainChart;
  // }

  // setTrafficPeriod(value: string): void {
  //   this.trafficRadioGroup.setValue({ trafficRadio: value });
  //   this.#chartsData.initMainChart(value);
  //   this.initCharts();
  // }

  // handleChartRef($chartRef: any) {
  //   if ($chartRef) {
  //     this.mainChartRef.set($chartRef);
  //   }
  // }



  // // renk şeması değiştirildiğinde grafiklerin yeniden güncellenmesini dinleyen bir olay dinleyicisi tanımlıyor.
  // updateChartOnColorModeChange() {
  //   const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
  //     this.setChartStyles();
  //   });

  //   this.#destroyRef.onDestroy(() => {
  //     unListen();
  //   });
  // }


  // //grafiklerin güncellenen temaya göre (örneğin koyu/aydınlık mod) yeniden şekillendirilmesini sağlıyor.
  // setChartStyles() {
  //   if (this.mainChartRef()) {
  //     setTimeout(() => {
  //       const options: ChartOptions = { ...this.mainChart.options };
  //       const scales = this.#chartsData.getScales();
  //       this.mainChartRef().options.scales = { ...options.scales, ...scales };
  //       this.mainChartRef().update();
  //     });
  //   }
  // }
}

