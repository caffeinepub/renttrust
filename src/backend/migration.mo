import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import List "mo:core/List";

module {
  // Old types
  type OldSignup = {
    name : Text;
    email : Text;
    phone : Text;
    userType : { #landlord; #tenant };
  };

  type OldActor = {
    adminSet : Set.Set<Principal>;
    signups : Set.Set<OldSignup>;
  };

  // New types
  type NewActor = {
    earlyAccessSignups : List.List<{ name : Text; email : Text; phone : Text; userType : { #landlord; #tenant }; numberOfProperties : Nat; submittedAt : Int }>;
  };

  // Migration function
  public func run(old : OldActor) : NewActor {
    // Discard previous adminSet and signups
    // Initialize new earlyAccessSignups list
    { earlyAccessSignups = List.empty<{ name : Text; email : Text; phone : Text; userType : { #landlord; #tenant }; numberOfProperties : Nat; submittedAt : Int }>() };
  };
};
