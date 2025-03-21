import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
// import List "mo:base/List";
import Bool "mo:base/Bool";

actor DYogdaan {

  type Key = Principal;

  type Value = Nat;

  var owner : Principal = Principal.fromText("amxgf-26ss5-uvqvy-istfd-l2tcl-x6lli-2m3ex-eylgq-x5xow-yzybp-iae");

  var totalSupply : Nat = 1000000000;

  var symbol : Text = "GEO";

  var balances = HashMap.HashMap<Key, Value>(1, Principal.equal, Principal.hash);

  balances.put(owner, totalSupply);

  public query func balanceOf(who : Key) : async Nat {

    var bal = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return bal;
  };

  public func getSymbol() : async Text {
    return symbol;
  };

  // main functionality

  type Entity = {
    name : Text;
    description : Text;
    registrationDate : Text;

  };

  type Transaction = {
    amount : Nat;
    date : Text;
    account : Principal;
  };

  type Campaign = {
    doer : Entity;
    purpose : Text;
    targetAmount : Nat;
    currentAmount : Nat;
    endDate : Text;
    donators : [Entity];
    active : Bool;

  };

  // future purpose
  // type Rankings = {

  // }

  // var ngoList : List.List<Entity> = List.nil<Entity>();

  // var campaignList : List.List<Campaign> = List.nil<Campaign>();

  // public query func getAllNgo() : async [Entity] {
  //   return List.toArray(ngoList);
  // };

  // public shared (msg) func donateToNgo() {

  //   // var donater = msg.caller;

  // }

};
