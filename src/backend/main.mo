import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Mix in authentication + role-based access control via persistent actor field (use as first field!).
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserType = {
    #landlord;
    #tenant;
  };

  type EarlyAccessSignup = {
    name : Text;
    email : Text;
    phone : Text;
    userType : UserType;
    numberOfProperties : Nat;
    submittedAt : Int;
  };

  // Use persistent verified tenants list in production after launch.
  let earlyAccessSignups = List.empty<EarlyAccessSignup>();

  public shared ({ caller }) func submitEarlyAccessSignup(name : Text, email : Text, phone : Text, userType : UserType, numberOfProperties : Nat) : async () {
    let signup : EarlyAccessSignup = {
      name;
      email;
      phone;
      userType;
      numberOfProperties;
      submittedAt = Time.now();
    };

    switch (earlyAccessSignups.find(func(s) { s.email == email })) {
      case (null) { earlyAccessSignups.add(signup) };
      case (_) { Runtime.trap("Email has already been used to register for early access.") };
    };
  };

  public query ({ caller }) func getSignupCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view signup count");
    };
    earlyAccessSignups.size();
  };

  public query ({ caller }) func getAllSignups() : async [EarlyAccessSignup] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access all signups");
    };
    earlyAccessSignups.toArray();
  };
};
