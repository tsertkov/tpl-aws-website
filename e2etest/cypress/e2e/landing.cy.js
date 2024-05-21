const ENV = process.env.ENV
const DOMAIN = process.env.DOMAIN

describe('tpl-aws-website landing', () => {
  beforeEach(() => {
    cy.visit('/', Cypress.env('BASIC_AUTH')
      ? {
          auth: {
            username: Cypress.env('BASIC_AUTH_USERNAME'),
            password: Cypress.env('BASIC_AUTH_PASSWORD'),
          }
        }
      : {}
    )
  })

  it('should have the header', () => {
    cy.get('h1').should('contain', 'tpl-aws-website')
  })

  it('should contain environment details', () => {
    cy.get('ul li').should(($p) => {
      const listLines = $p.map((i, el) => Cypress.$(el).text()).toArray()
      expect(listLines).to.have.members([
        `env: ${Cypress.env('ENV')}`,
        `domain: ${Cypress.env('DOMAIN')}`,
        `repo: github.com/${Cypress.env('GITHUB_REPO')}`,
      ])
    })
  })
})
