import {StringUtils} from '../utils/StringUtils';
import {NavigationButton} from './NavigationButton';

/**
 * Model for Navigation component
 */
export class NavigationModel {
  constructor(
    public title: string,
    public subtitle: string,
    public icon: string,
    public buttonList?: NavigationButton[] // optional
  ) {
  }

  hasContent(): boolean {
    return StringUtils.hasContent(this.icon);
  }
}
