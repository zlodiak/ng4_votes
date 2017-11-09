import { VotesPage } from './app.po';

describe('votes App', () => {
  let page: VotesPage;

  beforeEach(() => {
    page = new VotesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
