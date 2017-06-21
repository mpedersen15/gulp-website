class Person {
  constructor(name){
    this.name = name;
  }

  hello(){
    if (typeof this.name === 'string'){
      return `Hello, I'm ${this.name}!`;
    }else{
      return "Hello";
    }
  }
}

var matt = new Person("Matthew");
var greetHTML = templates['greeting']({
  message: matt.hello()
})
document.write(greetHTML);
