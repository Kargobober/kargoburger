import { bakeJSON } from '../../../src/utils/utils';

const ingredientsList = '[class^="List_list__"]';
const ingredientsSection = '[class^="BurgerIngredients_section__"]';
const burgerConstructorList = '[class^="BurgerConstructor_list__"]';
const modalSelector = '#react-modals';

describe('Testing burger constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });



  it('Tabs should change style while scrolling', () => {
    cy.get('[class^="BurgerIngredients_list__"]').find('li').as('list');

    cy.get('@list').first().find('a').find('div').as('firstTab');
    cy.get('@firstTab').should('have.class', 'tab_type_current');

    cy.get('@list').last().find('a').find('div').as('lastTab');
    cy.get('@lastTab').should('not.have.class', 'tab_type_current');

    // class^=  --→ класс должен быть первой подстрокой в селекторе
    // потому использовал class*=  --→ наличие подстроки в селекторе
    // тест может упасть просто из-за смены порядка классов -_-
    cy.get('@list')
      .parents('section')
      .find('[class*="List_section__"]')
      .scrollTo('bottom');

    cy.get('@firstTab').should('not.have.class', 'tab_type_current');
    cy.get('@lastTab').should('have.class', 'tab_type_current');
  });



  it('The initial constructor is empty', () => {
    // а тут класс идёт первым, так что class^=
    cy.get('main').find('section').eq(1)
      .find(burgerConstructorList).as('list');

    cy.get('@list').children()
      .should(($children) => { expect($children).to.have.length(0)});

    cy.get('@list').prev().should('not.have.class', 'constructor-element');
    cy.get('@list').next().should('not.exist');
  });



  it('The ingredient can be dragged into the constructor', () => {
    cy.get('main').find('section').eq(1)
      .find(burgerConstructorList).as('list');

    cy.get(ingredientsSection)
      .find(ingredientsList).find('li').first()
      .trigger('dragstart');

    cy.get('@list').trigger('drop');

    // Всё ещё ноль, т.к. дропается булочка, а булочка хранится в дивах над и под ul
    cy.get('@list').children()
      .should(($children) => { expect($children).to.have.length(0) });

    cy.get('@list').prev().should('have.class', 'constructor-element');
    cy.get('@list').next().should('have.class', 'constructor-element');


    // Теперь дропаем основной ингредиент
    cy.get(ingredientsSection)
    .find(ingredientsList).find('li').eq(5)
    .trigger('dragstart');

    cy.get('@list').trigger('drop');

    cy.get('@list').children()
      .should(($children) => {
        // дети есть, массив с одним элементом
        expect($children).to.have.length(1);

        // вытащили имя класса
        const className = $children[0].className;
        // и через match можно передать регурялное выражение
        expect(className).to.match(/Item_item__/);
      });
  });



  it('Posting order', () => {
    // дропаем ингредиенты в конструктор
    cy.get('main').find('section').eq(1)
      .find(burgerConstructorList).as('list');

    cy.get(ingredientsSection)
      .find(ingredientsList).find('li').first()
      .trigger('dragstart');
    cy.get('@list').trigger('drop');

    cy.get(ingredientsSection)
      .find(ingredientsList).find('li').eq(5)
      .trigger('dragstart');
    cy.get('@list').trigger('drop');


    // изначально модалка пустая
    cy.get(modalSelector).children()
      .should(($children) => { expect($children).to.have.length(0) });

    cy.intercept('POST', 'orders', { fixture: 'postOrder.json' });
    cy.get('button').contains('Оформить заказ').as('buttonPost');
    cy.get('@buttonPost').click();


    // Логирование пользователя
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/login');
    });

    cy.intercept('POST', 'login', { fixture: 'login.json'})
    cy.get('form').within(() => {
      cy.get('input:first').type('kargobober@email.com');
      cy.get('input:last').type('very-hard-password_&_!').blur();

      cy.get('button').click();
    });

    // возврат в конструктор
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
    cy.get('@buttonPost').click();

    cy.get(modalSelector).find('div').first().as('content');
    cy.get('@content').find('div').last().find('h3').should('contain', '25007');

    // выход из модалки
    cy.get('body').type('{esc}');

    cy.get(modalSelector).children()
      .should(($children) => { expect($children).to.have.length(0) });
  });



  it('Modal for ingredients', () => {
    // мы дома?
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });

    // модалка пустая?
    cy.get(modalSelector).children()
      .should(($children) => { expect($children).to.have.length(0) });

    // кликаем на карточку товара
    cy.get(ingredientsSection)
      .find(ingredientsList)
      .find('li').first().click();

    // локация должна смениться
    cy.location().should((location) => {
      expect(location.pathname).to.match(/ingredients\/643d69a5c3f7b9001cfa*/);
    });

    // модалка открыта?
    cy.get(modalSelector).find('div').first().as('content');

    cy.get('@content').find('div').last().find('h3')
      .should('contain', 'Краторная булка N-200i');

    // при перезагрузке...
    cy.reload();

    // путь должен остаться тот же
    cy.location().should((location) => {
      expect(location.pathname).to.match(/ingredients\/643d69a5c3f7b9001cfa*/);
    });

    // и модалка не должна закрыться
    cy.get('@content').find('div').last().find('h3')
      .should('contain', 'Краторная булка N-200i');

    // закрытие модалки кликом в крестик (esc проверен в тесте заказа)
    cy.get('@content').find('div').first().find('button').click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });

    cy.get(modalSelector).children()
      .should(($children) => { expect($children).to.have.length(0) });
  });
});
