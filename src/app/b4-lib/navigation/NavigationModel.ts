import {StringUtils} from '../utils/StringUtils';

/**
 * Model for Navigation component
 */
export class NavigationModel {
  constructor(public title: string, public subtitle: string, public icon: string) {
  }

  hasContent(): boolean {
    return StringUtils.hasContent(this.title)
      && StringUtils.hasContent(this.subtitle)
      && StringUtils.hasContent(this.icon);
  }
}
