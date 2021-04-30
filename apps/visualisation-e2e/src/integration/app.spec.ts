import { getSubTitle, getTitle, getVisualisationTitle } from '../support/app.po';

describe('visualisation', () => {
  beforeEach(() => cy.visit('/'));

  it('should display stack visualisaton by default', () => {
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain('/stack');
    });
  });

  it('should display correct title', () => {
    getTitle().contains('Visualisation of Data Structures and Algorithms');
  });

  it('should display correct title', () => {
    getSubTitle().contains('Aberystwyth University');
  });

  it('should redirect bad request to Stack visualisation', () => {
    cy.visit('/adsasdsad');
    getVisualisationTitle().contains('Stack');
  });

  it('should open Queue visualisation', () => {
    cy.visit('/queue');
    getVisualisationTitle().contains('Queue');
  });

  it('should open priority queue visualisation', () => {
    cy.visit('/priority-queue');
    getVisualisationTitle().contains('Priority Queue');
  });

  it('should open hash function visualisation', () => {
    cy.visit('/hash-function');
    getVisualisationTitle().contains('Hash functions with collision handling');
  });

  it('should open binary search tree visualisation', () => {
    cy.visit('/binary-search-tree');
    getVisualisationTitle().contains('Binary search tree');
  });

  it('should open hidden markov model visualisation', () => {
    cy.visit('/hidden-markov-model');
    getVisualisationTitle().contains('Hidden Markov Model');
  });
});
