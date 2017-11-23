import { BudgetController } from "./BudgetController.js";
import { UIController } from "./UIController.js";

const budgetController = new BudgetController();
const uiController = new UIController();
/////////////////////////////////
//// GLOBAL APP CONTROLLER
/////////////////////////////////

class Controller {
  constructor(budgetCtrl, UICtrl) {
    this.budgetCtrl = budgetCtrl;
    this.UICtrl = UICtrl;
  }

  setupEventListeners() {
    let DOM = this.UICtrl.getDOMstrings();

    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", this.ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        this.ctrlAddItem();
      }
    });
  }

  updateBudget() {
    // 1. calculate the budget
    this.budgetCtrl.calculateBudget();

    // 2. return the budget
    let budget = this.budgetCtrl.getBudget();

    // 3. display the budget on the UI
    this.UICtrl.displayBudget(budget);
  }

  ctrlAddItem() {
    let input, newItem;

    // 1. get the filled input data
    input = this.UICtrl.getinput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item to the budget ctrl
      newItem = this.budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. add the item to the UI
      this.UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      this.UICtrl.clearFields();

      // 5. calculate the budget
      this.updateBudget();
    }
  }

  init() {
    console.log("Application has started.");
    this.UICtrl.displayBudget({
      budget: 0,
      totalInc: 0,
      totalExp: 0,
      percentage: -1
    });
    // this.setupEventListeners();

    let DOM = this.UICtrl.getDOMstrings();
    console.log("DOM:", DOM.inputBtn);

    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", () => this.ctrlAddItem());

    document.addEventListener("keypress", event => {
      if (event.keyCode === 13 || event.which === 13) {
        this.ctrlAddItem();
      }
    });
  }
}

const controller = new Controller(budgetController, uiController);

controller.init();
budgetController.addItem("inc", "Hello", 1200);
budgetController.addItem("inc", "Tomcat", 1200);
budgetController.addItem("exp", "Use", 1200);

budgetController.testing();

console.log(budgetController.data);

console.log(budgetController.getBudget());
console.log(uiController.getinput());

/*
const controller = (function(budgetCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  let updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    let budget = budgetCtrl.getBudget();

    // 3. display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  let ctrlAddItem = function() {
    let input, newItem;

    // 1. get the filled input data
    input = UICtrl.getinput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item to the budget ctrl
      newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. calculate the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log("Application has started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, uiController);

controller.init();
*/
