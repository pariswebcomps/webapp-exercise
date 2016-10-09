import { ParisWebComponentAngular2Page } from './app.po';

describe('paris-web-component-angular2 App', function() {
  let page: ParisWebComponentAngular2Page;

  beforeEach(() => {
    page = new ParisWebComponentAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
