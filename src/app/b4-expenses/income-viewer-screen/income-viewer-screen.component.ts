import {Component, Input, OnInit} from '@angular/core';
import {Income} from '../models/Income';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {NavigationButton} from '../../b4-lib/navigation/NavigationButton';
import {ButtonPosition} from '../../b4-lib/navigation/ButtonPosition';
import {IncomeUtils} from '../utils/IncomeUtils';

@Component({
  selector: 'income-viewer-screen',
  templateUrl: './income-viewer-screen.component.html',
  styleUrls: ['./income-viewer-screen.component.scss']
})
export class IncomeViewerScreenComponent implements OnInit {

  @Input()
  public income: Income;

  public navigationModel: NavigationModel;

  public utils = IncomeUtils;

  constructor() {
  }

  /**
   * TODO:
   *  - text in json file (remove from ts)
   *  - exception in ErrorCode
   *  - unit tests ...
   */
  ngOnInit() {
    const navigationButton: NavigationButton[] = [
      {name: 'edit', icon: 'edit', position: ButtonPosition.RIGHT},
      {name: 'back', icon: 'arrow_back_ios', position: ButtonPosition.LEFT},
    ];
    this.navigationModel = new NavigationModel('income.details.title', 'income.details.subtitle', 'swap_horiz', navigationButton);
  }
}
