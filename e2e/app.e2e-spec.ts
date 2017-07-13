import { Ng2HelloPage } from './app.po';

describe('ng2-hello App', () => {
  let page: Ng2HelloPage;

  beforeEach(() => {
    page = new Ng2HelloPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
