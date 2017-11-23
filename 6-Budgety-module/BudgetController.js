////////////////////////////////
//// BUDGET CONTROLLER
/////////////////////////////////

class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

export class BudgetController {
  constructor() {
    this.prop = "test";
    this.data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1
    };
  }

  calculateTotal(type) {
    let sum = 0;
    this.data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    this.data.totals[type] = sum;
  }

  addItem(type, des, val) {
    var newItem, ID;

    // Create new ID
    // ex data.allItems['inc'][5].id
    if (this.data.allItems[type].length > 0) {
      ID = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    //Create new item based on 'inc' or 'exp' type
    if (type === "exp") {
      newItem = new Expense(ID, des, val);
    } else if (type === "inc") {
      newItem = new Income(ID, des, val);
    }

    // push it into our data structure
    this.data.allItems[type].push(newItem);

    // return the new element
    return newItem;
  }

  calculateBudget() {
    // calculate total income and expenses
    this.calculateTotal("exp");
    this.calculateTotal("inc");

    // Calculate the budget income-expenses
    console.log(this.getBudget());
    console.log(this.data);

    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    // calculate percentage
    if (this.data.totals.inc > 0) {
      this.data.percentage = Math.round(
        this.data.totals.exp / this.data.totals.inc * 100
      );
    } else {
      this.data.percentage = -1;
    }
  }

  getBudget() {
    return {
      budget: this.data.budget,
      totalInc: this.data.totals.inc,
      totalExp: this.data.totals.exp,
      percentage: this.data.percentage
    };
  }

  testing() {
    console.log(this.data);
  }
}

/*
export const budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Create new ID
      // ex data.allItems['inc'][5].id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      // push it into our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // Calculate the budget income-expenses

      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
})();
*/
