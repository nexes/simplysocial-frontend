import { LifesnapPage } from './app.po';

describe('lifesnap App', () => {
  let page: LifesnapPage;

  beforeEach(() => {
    page = new LifesnapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
