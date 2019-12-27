import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {By} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';
import {NavigationModel} from './NavigationModel';
import {ButtonPosition} from './ButtonPosition';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let ngxMock;
  const navigationModel = new NavigationModel('title', 'subtitle', 'assignment_return', [
    {icon: 'close', name: 'quit', position: ButtonPosition.RIGHT},
    {icon: 'add', name: 'save', position: ButtonPosition.LEFT}
  ]);
  beforeEach(async(() => {
    ngxMock = jasmine.createSpyObj(['error']);
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      providers: [{provide: NGXLogger, useValue: ngxMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' when testing template: ', () => {
    it(' should render given navigation model elements in template:', () => {

      // when:
      component.navigationModel = navigationModel;
      fixture.detectChanges();

      // then:
      const titleHtml = fixture.debugElement.query(By.css('.title'));
      const subTitleHtml = fixture.debugElement.query(By.css('.sub-title'));
      const iconHtml = fixture.debugElement.query(By.css('.icon'));
      expect(titleHtml.nativeElement.textContent).toContain(navigationModel.title);
      expect(subTitleHtml.nativeElement.textContent).toContain(navigationModel.subtitle);
      expect(iconHtml.nativeElement.textContent).toContain(navigationModel.icon);
    });
  });

  describe('when testing button interaction', () => {
    it('should get right and left button', async(() => {
      spyOn(component, 'onClick');
      component.navigationModel = navigationModel;
      fixture.detectChanges();
      expect(component.getRightButton()).not.toBeNull();
      expect(component.getLeftButton()).not.toBeNull();
    }));
    it('should emit ButtonType.SUBMIT if left button clicked', async(() => {
      spyOn(component, 'onClick');

      component.navigationModel = navigationModel;
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('.left');
      expect(button).not.toBeNull();
      button.click();

      fixture.whenStable().then(() => {
        expect(component.onClick).toHaveBeenCalledWith(component.leftButton.name);
      });
    }));

    it('should emit ButtonType.CANCEL if right button clicked', async(() => {
      spyOn(component, 'onClick');
      component.navigationModel = navigationModel;
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('.right');
      expect(button).not.toBeNull();
      button.click();
      fixture.whenStable().then(() => {
        expect(component.onClick).toHaveBeenCalledWith(component.rightButton.name);
      });
    }));

    it('should not render right button if associated navigation button was not provided', async(() => {
      spyOn(component, 'onClick');
      component.navigationModel = new NavigationModel('title', 'subtitle', 'assignment_return', [
        {icon: 'add', name: 'save', position: ButtonPosition.LEFT}
      ]);
      fixture.detectChanges();
      expect(component.getRightButton()).not.toBeNull();
      expect(component.getLeftButton()).not.toBeNull();
      const button = fixture.debugElement.nativeElement.querySelector('.right');
      expect(button).toBeNull();
    }));

    it('should not render left button if associated navigation button was not provided', async(() => {
      spyOn(component, 'onClick');
      component.navigationModel = new NavigationModel('title', 'subtitle', 'assignment_return', [
        {icon: 'add', name: 'save', position: ButtonPosition.RIGHT}
      ]);
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('.left');
      expect(button).toBeNull();
    }));

    it('should log error if navigation model was not found', async(() => {
      component.navigationModel = null;
      fixture.detectChanges();

      expect(ngxMock.error).toHaveBeenCalled();
    }));

  });

});
