actor DYogdaan {

  type Ngo = {
    name : Text;
    description : Text;

  };
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

};
