
//Deep Equal Func
function deepEquals(param1, param2) {

    //Checking if values are equal or both equals to null or undefined
    if (
        param1 === param2 ||
        (param1 === null && param2 === null) ||
        (param1 === undefined && param2 === undefined)
      )
          return true;
        //Checking if types are equal
        else if(typeof param1 !== typeof param2){
            return false;
        }
    
    //Checking Arrays
    let resultArray = checkArrays(param1,param2);
    if (resultArray!=undefined) {
      return resultArray;
    }
    
    //Checking Objects
   let result =  checkObjects(param1,param2);
   if (result !=undefined) {
    return result
   }

    //Checking if both equals to NaN
   if (typeof param1 === "number" && isNaN(param1) && isNaN(param2)) return true;

    return false;
  }

//HELPERS ===============================

function checkArrays(x,y) {
    if (Array.isArray(x)) {
        if (x.length !== y.length) return false;
    
        for (let i = 0; i < x.length; i++) {
          if (!deepEquals(x[i], y[i])) return false;
        }
        return true;
      }
}

function checkObjects(x,y) {
    if (x instanceof Object) {
        const value1Keys = Object.keys(x).sort();
        const value2Keys = Object.keys(y).sort();
        if (value1Keys.length !== value2Keys.length) return false;
        for (let i = 0; i < value1Keys.length; i++) {
          if (value1Keys[i] !== value2Keys[i]) return false;
          if (!deepEquals(x[value1Keys[i]], y[value2Keys[i]]))
            return false;
        }
        if ((Array.isArray(x)&&!Array.isArray(y))||(Array.isArray(y)&&!Array.isArray(x))) {
            return false;
          }
        return true;
      }
}

//Optional code - Works in most cases except sorting object keys and comparing

//#region 
// function deepEqualsDemo(param1,param2) {
//     if (JSON.stringify(param1)===JSON.stringify(param2))
//         return true;
//     return false;        
// }
//#endregion


//TESTING WITH CONSOLE LOG----------------------------------------------------

//#region  Console Tests
console.log('empty object vs array false', deepEquals({},[]));
console.log('empty array true', deepEquals([],[]));
console.log('empty object true', deepEquals({},{}));

console.log('object test true',deepEquals({a:123,b:231,c:"abc"},{c:"abc",b:231,a:123}));
console.log('null-null true', deepEquals(null,null));
console.log('undefined-undefined true', deepEquals(undefined,undefined));
console.log('NAN-NAN true', deepEquals(NaN,NaN));
console.log('number-number true', deepEquals(5,5));
console.log('number-number false', deepEquals(5,55));
console.log('string-number false', deepEquals("35",35));
console.log('string-string true', deepEquals("35a","35a"));
console.log('string-string false', deepEquals("35a","35aegwe"));

console.log('object false', deepEquals({a:123,c:{b:[4,5,6]}}, {a:123,b:{c:[4,'5',6]}}) );
console.log('array true', deepEquals([1,2,[3,4]],[1,2,[3,4]]));
console.log('array true', deepEquals([1,2,[3,4,{a:'abc'}]], [1,2,[3,4,{a:'abc'}]]));
//#endregion


module.exports = {
    deepEquals,
  };