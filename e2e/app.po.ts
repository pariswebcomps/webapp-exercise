import { browser, element, by } from 'protractor';

export class ParisWebComponentAngular2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pwc-root h1')).getText();
  }
}
