import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {By} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let ngxMock;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' when testing template: ', () => {
    it(' should render given navigation model elements in template:', () => {
      // given:
      const navigationModel = {title: 'title', subtitle: 'subtitle', icon: 'icon'};
      component.navigationModel = navigationModel;

      // when:
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
    it('should emit ButtonType.SUBMIT if left button clicked', async(() => {
      spyOn(component, 'onClick');

      const button = fixture.debugElement.nativeElement.querySelector('.left');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.onClick).toHaveBeenCalledWith(component.submitButton);
      });
    }));

    it('should emit ButtonType.CANCEL if right button clicked', async(() => {
      spyOn(component, 'onClick');

      const button = fixture.debugElement.nativeElement.querySelector('.right');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.onClick).toHaveBeenCalledWith(component.cancelButton);
      });
    }));

  });

});
