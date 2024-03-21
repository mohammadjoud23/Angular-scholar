import { Component, Input} from '@angular/core';
import { Scholarships } from '../../models/scholarhips';
@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Scholarships[] = [];

}
