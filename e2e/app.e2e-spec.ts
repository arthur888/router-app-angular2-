import { RouterAppPage } from './app.po';

describe('router-app App', function() {
  let page: RouterAppPage;

  beforeEach(() => {
    page = new RouterAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
