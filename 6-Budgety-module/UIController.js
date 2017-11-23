//////////////////////
//// UI Controller ////
//////////////////////
export class UIController {
  constructor() {
    this.DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list",
      budgetLabel: ".budget__value",
      incomeLabel: ".budget__income--value",
      expensesLabel: ".budget__expenses--value",
      percentageLabel: ".budget__expenses--percentage"
    };
  }

  getinput() {
    return {
      type: document.querySelector(this.DOMstrings.inputType).value, // will be either inc or exp
      description: document.querySelector(this.DOMstrings.inputDescription)
        .value,
      value: parseFloat(
        document.querySelector(this.DOMstrings.inputValue).value
      )
    };
  }

  addListItem(obj, type) {
    let html, newHtml, element;
    // Create HTML string with placeholder text
    if (type === "inc") {
      element = this.DOMstrings.incomeContainer;
      html = `
        <div class="item clearfix" id="income-%id%">
          <div class="item__description">%description%</div>
          <div class="right clearfix">
              <div class="item__value">%value%</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
        </div>
        `;
    } else if (type === "exp") {
      element = this.DOMstrings.expensesContainer;
      html = `<div class="item clearfix" id="expense-%id%">
          <div class="item__description">
            %description%
          </div>
          <div class="right clearfix">
            <div class="item__value">
              %value%
            </div>
          <div class="item__percentage">
            21%
          </div>
            <div class="item__delete">
              <button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i>
              </button>
            </div>
          </div>
        </div>
        `;
    }

    // replace the placeholder text with some actual data
    newHtml = html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", obj.value);

    // insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
  }

  clearFields() {
    let fields, fieldsArr;

    fields = document.querySelectorAll(
      this.DOMstrings.inputDescription + ", " + this.DOMstrings.inputValue
    );

    // turn fields which is a list to an array
    fieldsArr = Array.prototype.slice.call(fields);

    fieldsArr.forEach(function(current, index, array) {
      current.value = "";
    });

    fieldsArr[0].focus();
  }

  displayBudget(obj) {
    document.querySelector(this.DOMstrings.budgetLabel).textContent =
      obj.budget;
    document.querySelector(this.DOMstrings.incomeLabel).textContent =
      obj.totalInc;
    document.querySelector(this.DOMstrings.expensesLabel).textContent =
      obj.totalExp;

    if (obj.percentage > 0) {
      document.querySelector(this.DOMstrings.percentageLabel).textContent =
        obj.percentage + "%";
    } else {
      document.querySelector(this.DOMstrings.percentageLabel).textContent =
        "---";
    }
  }

  getDOMstrings() {
    return this.DOMstrings;
  }
}
/*
export const UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage"
  };

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `
        <div class="item clearfix" id="income-%id%">
          <div class="item__description">%description%</div>
          <div class="right clearfix">
              <div class="item__value">%value%</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
        </div>
        `;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%">
          <div class="item__description">
            %description%
          </div>
          <div class="right clearfix">
            <div class="item__value">
              %value%
            </div>
          <div class="item__percentage">
            21%
          </div>
            <div class="item__delete">
              <button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i>
              </button>
            </div>
          </div>
        </div>
        `;
      }

      // replace the placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // turn fields which is a list to an array
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();
*/
