1. module, data encapsulation, private and public variable
2. closure and IIFE
3. the inner funtion always has access to variable in the outer funtio  even after it is returned
4. var budgetController=(function(){
    var x=23;
    var add=function(a){
        return x+a;
    };
    return {
        publicTest : function(b){
            return add(b);
        }
    };
})();

var UIController = (function(){
    

})();

var controller=(function(budgetCtrl,UICtrl){
    var z=budgetCtrl.publicTest(5);
    return {
        another: function(){
            console.log(z);
        }
    };

})(budgetController,UIController);

5. KeyboardEvent, keycode

6. controll tell what other modules to do
7. value of a select is defined in the html

8. querySelectorAll returns a list, similar to array but lack useful methods

9. parseFloat to convert input string

10. testing in data control module to see the data structure

11. edge case

12. event.targetElement

13. when you call a method on a string primitive, js engine wrap around it and coerce it to a string object

14. can only delete a child of a parent not the child it self

15. toFixed(1) is a Number.prototypr method, returns a string