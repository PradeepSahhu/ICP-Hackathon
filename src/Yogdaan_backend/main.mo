import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Float "mo:base/Float";

actor YogdaanDonationPlatform {
  // Types
  public type NGO = {
    id : Nat;
    name : Text;
    description : Text;
    location : Text;
    completedProjects : Nat;
    beneficiaries : Nat;
    rank : Nat;
    transparencyScore : Nat; // 0-100
    verified : Bool;
  };

  public type Campaign = {
    id : Nat;
    title : Text;
    ngoId : Nat;
    description : Text;
    purpose : Text;
    location : Text;
    targetAmount : Nat;
    raisedAmount : Nat;
    startDate : Int;
    endDate : Int;
    status : CampaignStatus;
  };

  public type CampaignStatus = {
    #active;
    #completed;
    #cancelled;
  };

  public type Donation = {
    id : Nat;
    donorId : Principal;
    campaignId : Nat;
    amount : Nat; // In YGN tokens
    timestamp : Int;
    anonymous : Bool;
  };

  public type PastCampaign = {
    id : Nat;
    title : Text;
    ngoId : Nat;
    raisedAmount : Nat;
    beneficiaries : Nat;
    year : Text;
    status : Text;
  };

  public type User = {
    id : Principal;
    username : Text;
    totalDonated : Nat;
    donationCount : Nat;
    registrationDate : Int;
    tokenBalance : Nat; // YGN token balance
  };

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #InvalidInput;
    #CampaignEnded;
    #InsufficientFunds;
    #VotingEnded;
    #AlreadyVoted;
  };

  // Token specific types
  public type TokenInfo = {
    name : Text;
    symbol : Text;
    totalSupply : Nat;
    decimals : Nat;
  };

  // Spend request types
  public type SpendRequest = {
    id : Nat;
    campaignId : Nat;
    title : Text;
    description : Text;
    amount : Nat;
    recipient : Text;
    purpose : Text;
    createdBy : Principal;
    createdAt : Int;
    status : SpendRequestStatus;
    votingEndTime : Int;
    approvalPercentage : Float;
    requiredApprovalPercentage : Float;
  };

  public type SpendRequestStatus = {
    #pending;
    #approved;
    #rejected;
    #executed;
  };

  public type Vote = {
    requestId : Nat;
    voter : Principal;
    approved : Bool;
    votingPower : Nat; // Proportional to donation amount
    timestamp : Int;
  };

  public type Notification = {
    id : Nat;
    userId : Principal;
    title : Text;
    message : Text;
    timestamp : Int;
    read : Bool;
    actionType : NotificationActionType;
    actionId : ?Nat; // Optional ID for related entity (spend request, campaign, etc.)
  };

  public type NotificationActionType = {
    #spendRequest;
    #campaignUpdate;
    #general;
  };

  // State variables
  private stable var nextNgoId : Nat = 1;
  private stable var nextCampaignId : Nat = 1;
  private stable var nextDonationId : Nat = 1;
  private stable var nextSpendRequestId : Nat = 1;
  private stable var nextNotificationId : Nat = 1;
  private stable var adminPrincipal : Principal = Principal.fromText("amxgf-26ss5-uvqvy-istfd-l2tcl-x6lli-2m3ex-eylgq-x5xow-yzybp-iae");

  private var ngos = HashMap.HashMap<Nat, NGO>(10, Nat.equal, Int.hash);
  private var campaigns = HashMap.HashMap<Nat, Campaign>(10, Nat.equal, Int.hash);
  private var donations = HashMap.HashMap<Nat, Donation>(100, Nat.equal, Int.hash);
  private var pastCampaigns = HashMap.HashMap<Nat, PastCampaign>(50, Nat.equal, Int.hash);
  private var users = HashMap.HashMap<Principal, User>(100, Principal.equal, Principal.hash);
  private var ngoCampaigns = HashMap.HashMap<Nat, [Nat]>(10, Nat.equal, Int.hash);
  private var userDonations = HashMap.HashMap<Principal, [Nat]>(100, Principal.equal, Principal.hash);

  // New storage structures for tokenization
  private var tokenInfo : TokenInfo = {
    name = "Yogdaan";
    symbol = "YGN";
    totalSupply = 1_000_000_000; // 1 billion initial supply
    decimals = 8; // 8 decimal places precision
  };
  
  private var spendRequests = HashMap.HashMap<Nat, SpendRequest>(50, Nat.equal, Int.hash);
  private var votes = HashMap.HashMap<Text, Vote>(200, Text.equal, Text.hash); // Key is requestId + "-" + voterId
  private var campaignDonors = HashMap.HashMap<Nat, [Principal]>(50, Nat.equal, Int.hash); // Track donors per campaign
  private var campaignDonorShares = HashMap.HashMap<Text, Float>(200, Text.equal, Text.hash); // Key is campaignId + "-" + donorId
  private var notifications = HashMap.HashMap<Nat, Notification>(500, Nat.equal, Int.hash);
  private var userNotifications = HashMap.HashMap<Principal, [Nat]>(100, Principal.equal, Principal.hash);

  // Helper functions
  private func isAdmin(caller : Principal) : Bool {
    return Principal.equal(caller, adminPrincipal);
  };

  private func isNgoOwner(ngoId : Nat, caller : Principal) : Bool {
    // In a real implementation, you'd have a way to associate NGOs with owners
    // For simplicity, only admin can manage NGOs in this example
    return isAdmin(caller);
  };

  private func calculateNGORank(ngoId : Nat) : Nat {
    switch (ngos.get(ngoId)) {
      case (null) { return 0 };
      case (?ngo) {
        var totalRaised : Nat = 0;

        // Get all campaigns for this NGO and sum up raised amounts
        let ngoCompletedCampaigns = Buffer.Buffer<PastCampaign>(0);
        for ((_, pastCampaign) in pastCampaigns.entries()) {
          if (pastCampaign.ngoId == ngoId) {
            totalRaised += pastCampaign.raisedAmount;
          };
        };

        // Get active campaigns as well
        for ((_, campaign) in campaigns.entries()) {
          if (campaign.ngoId == ngoId) {
            totalRaised += campaign.raisedAmount;
          };
        };

        // Calculate score based on weighted factors
        let projectScore = ngo.completedProjects * 10;
        let beneficiaryScore = ngo.beneficiaries / 1000; // Normalize by 1000
        let transparencyScore = ngo.transparencyScore * 5;
        let fundScore = totalRaised / 10000; // Normalize by 10,000

        let totalScore = projectScore + beneficiaryScore + transparencyScore + fundScore;

        // Convert score to rank (lower score = higher rank number)
        // This is a simplified algorithm
        if (totalScore > 1000) { return 1 } else if (totalScore > 800) {
          return 2;
        } else if (totalScore > 600) { return 3 } else if (totalScore > 400) {
          return 4;
        } else if (totalScore > 200) { return 5 } else { return 6 };
      };
    };
  };

  private func calculateVotingPower(donorId : Principal, campaignId : Nat) : Float {
    var totalDonation : Nat = 0;
    var donorDonation : Nat = 0;

    // Get all donations for this campaign
    for ((_, donation) in donations.entries()) {
      if (donation.campaignId == campaignId) {
        totalDonation += donation.amount;
        if (Principal.equal(donation.donorId, donorId)) {
          donorDonation += donation.amount;
        };
      };
    };

    if (totalDonation == 0) {
      return 0.0;
    };

    return Float.fromInt(donorDonation) / Float.fromInt(totalDonation) * 100.0;
  };

  private func hasEnoughApprovals(requestId : Nat) : Bool {
    switch (spendRequests.get(requestId)) {
      case (null) { return false };
      case (?request) {
        return request.approvalPercentage >= request.requiredApprovalPercentage;
      };
    };
  };

  private func sendNotification(userId : Principal, title : Text, message : Text, actionType : NotificationActionType, actionId : ?Nat) {
    let notificationId = nextNotificationId;
    nextNotificationId += 1;

    let notification : Notification = {
      id = notificationId;
      userId = userId;
      title = title;
      message = message;
      timestamp = Time.now();
      read = false;
      actionType = actionType;
      actionId = actionId;
    };

    notifications.put(notificationId, notification);

    // Add to user's notification list
    switch (userNotifications.get(userId)) {
      case (null) {
        userNotifications.put(userId, [notificationId]);
      };
      case (?existingNotifications) {
        let newNotifications = Array.append(existingNotifications, [notificationId]);
        userNotifications.put(userId, newNotifications);
      };
    };
  };

  private func notifyAllDonors(campaignId : Nat, title : Text, message : Text, actionType : NotificationActionType, actionId : ?Nat) {
    switch (campaignDonors.get(campaignId)) {
      case (null) { /* No donors to notify */ };
      case (?donors) {
        for (donorId in donors.vals()) {
          sendNotification(donorId, title, message, actionType, actionId);
        };
      };
    };
  };

  private func updateCampaignDonorShares(campaignId : Nat) {
    var campaignTotal : Nat = 0;
    let donorAmounts = HashMap.HashMap<Principal, Nat>(20, Principal.equal, Principal.hash);
    
    // Calculate total amount and individual donor amounts
    for ((_, donation) in donations.entries()) {
      if (donation.campaignId == campaignId) {
        campaignTotal += donation.amount;
        
        switch (donorAmounts.get(donation.donorId)) {
          case (null) {
            donorAmounts.put(donation.donorId, donation.amount);
          };
          case (?existingAmount) {
            donorAmounts.put(donation.donorId, existingAmount + donation.amount);
          };
        };
      };
    };
    
    // Calculate and store share percentages
    if (campaignTotal > 0) {
      for ((donorId, amount) in donorAmounts.entries()) {
        let share = Float.fromInt(amount) / Float.fromInt(campaignTotal) * 100.0;
        let key = Nat.toText(campaignId) # "-" # Principal.toText(donorId);
        campaignDonorShares.put(key, share);
      };
    };
  };

  // Token Management
  public query func getTokenInfo() : async TokenInfo {
    return tokenInfo;
  };

  public shared ({ caller }) func mintTokens(recipient : Principal, amount : Nat) : async Result.Result<(), Error> {
    if (not isAdmin(caller)) {
      return #err(#NotAuthorized);
    };

    // Update recipient balance
    switch (users.get(recipient)) {
      case (null) {
        // Create new user with tokens
        let newUser : User = {
          id = recipient;
          username = "New User";
          totalDonated = 0;
          donationCount = 0;
          registrationDate = Time.now();
          tokenBalance = amount;
        };
        users.put(recipient, newUser);
      };
      case (?user) {
        // Update existing user
        let updatedUser : User = {
          id = user.id;
          username = user.username;
          totalDonated = user.totalDonated;
          donationCount = user.donationCount;
          registrationDate = user.registrationDate;
          tokenBalance = user.tokenBalance + amount;
        };
        users.put(recipient, updatedUser);
      };
    };

    // Update total supply
    tokenInfo := {
      name = tokenInfo.name;
      symbol = tokenInfo.symbol;
      totalSupply = tokenInfo.totalSupply + amount;
      decimals = tokenInfo.decimals;
    };

    return #ok();
  };

  public shared ({ caller }) func transferTokens(to : Principal, amount : Nat) : async Result.Result<(), Error> {
    // Get caller's balance
    switch (users.get(caller)) {
      case (null) {
        return #err(#InsufficientFunds);
      };
      case (?fromUser) {
        if (fromUser.tokenBalance < amount) {
          return #err(#InsufficientFunds);
        };

        // Update sender balance
        let updatedFromUser : User = {
          id = fromUser.id;
          username = fromUser.username;
          totalDonated = fromUser.totalDonated;
          donationCount = fromUser.donationCount;
          registrationDate = fromUser.registrationDate;
          tokenBalance = fromUser.tokenBalance - amount;
        };
        users.put(caller, updatedFromUser);

        // Update recipient balance
        switch (users.get(to)) {
          case (null) {
            // Create new user with tokens
            let newUser : User = {
              id = to;
              username = "New User";
              totalDonated = 0;
              donationCount = 0;
              registrationDate = Time.now();
              tokenBalance = amount;
            };
            users.put(to, newUser);
          };
          case (?toUser) {
            // Update existing user
            let updatedToUser : User = {
              id = toUser.id;
              username = toUser.username;
              totalDonated = toUser.totalDonated;
              donationCount = toUser.donationCount;
              registrationDate = toUser.registrationDate;
              tokenBalance = toUser.tokenBalance + amount;
            };
            users.put(to, updatedToUser);
          };
        };

        return #ok();
      };
    };
  };

  public query func getTokenBalance(user : Principal) : async Result.Result<Nat, Error> {
    switch (users.get(user)) {
      case (null) { return #err(#NotFound) };
      case (?user) { return #ok(user.tokenBalance) };
    };
  };

  // Admin functions
  public shared ({ caller }) func setAdmin(newAdmin : Principal) : async Result.Result<(), Error> {
    if (not isAdmin(caller)) {
      return #err(#NotAuthorized);
    };

    adminPrincipal := newAdmin;
    return #ok();
  };

  // NGO Management
  public shared ({ caller }) func createNGO(name : Text, description : Text, location : Text) : async Result.Result<Nat, Error> {
  
    let ngoId = nextNgoId;
    nextNgoId += 1;

    let newNGO : NGO = {
      id = ngoId;
      name = name;
      description = description;
      location = location;
      completedProjects = 0;
      beneficiaries = 0;
      rank = 999; // Will be calculated later
      transparencyScore = 75; // Default score
      verified = false;
    };

    ngos.put(ngoId, newNGO);

    return #ok(ngoId);
  };

  public shared ({ caller }) func updateNGO(
    ngoId : Nat,
    name : Text,
    description : Text,
    location : Text,
    completedProjects : Nat,
    beneficiaries : Nat,
    transparencyScore : Nat,
    verified : Bool,
  ) : async Result.Result<(), Error> {
   

    switch (ngos.get(ngoId)) {
      case (null) { return #err(#NotFound) };
      case (?existingNGO) {
        let updatedNGO : NGO = {
          id = ngoId;
          name = name;
          description = description;
          location = location;
          completedProjects = completedProjects;
          beneficiaries = beneficiaries;
          rank = calculateNGORank(ngoId);
          transparencyScore = transparencyScore;
          verified = verified;
        };

        ngos.put(ngoId, updatedNGO);
        return #ok();
      };
    };
  };

  public query func getNGO(ngoId : Nat) : async Result.Result<NGO, Error> {
    switch (ngos.get(ngoId)) {
      case (null) { return #err(#NotFound) };
      case (?ngo) { return #ok(ngo) };
    };
  };

  public query func getAllNGOs() : async [NGO] {
    let buffer = Buffer.Buffer<NGO>(ngos.size());
    for ((_, ngo) in ngos.entries()) {
      buffer.add(ngo);
    };
    return Buffer.toArray(buffer);
  };

  // Campaign Management
  public shared ({ caller }) func createCampaign(
    ngoId : Nat,
    title : Text,
    description : Text,
    purpose : Text,
    location : Text,
    targetAmount : Nat,
    startDate : Int,
    endDate : Int,
  ) : async Result.Result<Nat, Error> {
   

    switch (ngos.get(ngoId)) {
      case (null) { return #err(#NotFound) };
      case (?_) {
        let campaignId = nextCampaignId;
        nextCampaignId += 1;

        let newCampaign : Campaign = {
          id = campaignId;
          title = title;
          ngoId = ngoId;
          description = description;
          purpose = purpose;
          location = location;
          targetAmount = targetAmount;
          raisedAmount = 0;
          startDate = startDate;
          endDate = endDate;
          status = #active;
        };

        campaigns.put(campaignId, newCampaign);

        // Add campaign to NGO's campaign list
        switch (ngoCampaigns.get(ngoId)) {
          case (null) {
            ngoCampaigns.put(ngoId, [campaignId]);
          };
          case (?existingCampaigns) {
            let newCampaigns = Array.append(existingCampaigns, [campaignId]);
            ngoCampaigns.put(ngoId, newCampaigns);
          };
        };

        return #ok(campaignId);
      };
    };
  };

  public shared ({ caller }) func updateCampaign(
    campaignId : Nat,
    title : Text,
    description : Text,
    purpose : Text,
    targetAmount : Nat,
    endDate : Int,
  ) : async Result.Result<(), Error> {
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?existingCampaign) {
        if (not isAdmin(caller) and not isNgoOwner(existingCampaign.ngoId, caller)) {
          return #err(#NotAuthorized);
        };

        let updatedCampaign : Campaign = {
          id = campaignId;
          title = title;
          ngoId = existingCampaign.ngoId;
          description = description;
          purpose = purpose;
          location = existingCampaign.location;
          targetAmount = targetAmount;
          raisedAmount = existingCampaign.raisedAmount;
          startDate = existingCampaign.startDate;
          endDate = endDate;
          status = existingCampaign.status;
        };

        campaigns.put(campaignId, updatedCampaign);
        return #ok();
      };
    };
  };

  public shared ({ caller }) func completeCampaign(campaignId : Nat, beneficiaries : Nat, year : Text) : async Result.Result<(), Error> {
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?campaign) {
        if (not isAdmin(caller) and not isNgoOwner(campaign.ngoId, caller)) {
          return #err(#NotAuthorized);
        };

        // Create past campaign record
        let pastCampaign : PastCampaign = {
          id = campaignId;
          title = campaign.title;
          ngoId = campaign.ngoId;
          raisedAmount = campaign.raisedAmount;
          beneficiaries = beneficiaries;
          year = year;
          status = "Completed";
        };

        pastCampaigns.put(campaignId, pastCampaign);

        // Update NGO stats
        switch (ngos.get(campaign.ngoId)) {
          case (null) {};
          case (?ngo) {
            let updatedNGO : NGO = {
              id = ngo.id;
              name = ngo.name;
              description = ngo.description;
              location = ngo.location;
              completedProjects = ngo.completedProjects + 1;
              beneficiaries = ngo.beneficiaries + beneficiaries;
              rank = ngo.rank; // Will be recalculated later
              transparencyScore = ngo.transparencyScore;
              verified = ngo.verified;
            };

            ngos.put(ngo.id, updatedNGO);
          };
        };

        // Update campaign status
        let updatedCampaign : Campaign = {
          id = campaign.id;
          title = campaign.title;
          ngoId = campaign.ngoId;
          description = campaign.description;
          purpose = campaign.purpose;
          location = campaign.location;
          targetAmount = campaign.targetAmount;
          raisedAmount = campaign.raisedAmount;
          startDate = campaign.startDate;
          endDate = campaign.endDate;
          status = #completed;
        };

        campaigns.put(campaignId, updatedCampaign);

        // Recalculate NGO rank
        let newRank = calculateNGORank(campaign.ngoId);
        switch (ngos.get(campaign.ngoId)) {
          case (null) { /* Should not happen */ };
          case (?ngo) {
            let updatedNGO : NGO = {
              id = ngo.id;
              name = ngo.name;
              description = ngo.description;
              location = ngo.location;
              completedProjects = ngo.completedProjects;
              beneficiaries = ngo.beneficiaries;
              rank = newRank;
              transparencyScore = ngo.transparencyScore;
              verified = ngo.verified;
            };

            ngos.put(ngo.id, updatedNGO);
          };
        };

        // Notify donors
        notifyAllDonors(
          campaignId,
          "Campaign Completed: " # campaign.title,
          "The campaign has been successfully completed with " # Nat.toText(beneficiaries) # " beneficiaries. Thank you for your support!",
          #campaignUpdate,
          ?campaignId,
        );

        return #ok();
      };
    };
  };

  public query func getCampaign(campaignId : Nat) : async Result.Result<Campaign, Error> {
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?campaign) { return #ok(campaign) };
    };
  };

  public query func getAllCampaigns() : async [Campaign] {
    let buffer = Buffer.Buffer<Campaign>(campaigns.size());
    for ((_, campaign) in campaigns.entries()) {
      buffer.add(campaign);
    };
    return Buffer.toArray(buffer);
  };

  public query func getCampaignsByNGO(ngoId : Nat) : async Result.Result<[Campaign], Error> {
    switch (ngos.get(ngoId)) {
      case (null) { return #err(#NotFound) };
      case (?_) {
        let buffer = Buffer.Buffer<Campaign>(10);
        for ((_, campaign) in campaigns.entries()) {
          if (campaign.ngoId == ngoId) {
            buffer.add(campaign);
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

  public query func getPastCampaignsByNGO(ngoId : Nat) : async Result.Result<[PastCampaign], Error> {
    switch (ngos.get(ngoId)) {
      case (null) { return #err(#NotFound) };
      case (?_) {
        let buffer = Buffer.Buffer<PastCampaign>(10);
        for ((_, pastCampaign) in pastCampaigns.entries()) {
          if (pastCampaign.ngoId == ngoId) {
            buffer.add(pastCampaign);
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

  // Donation Functions with YGN tokens
  public shared ({ caller }) func donate(campaignId : Nat, amount : Nat, anonymous : Bool) : async Result.Result<Nat, Error> {
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?campaign) {
        if (campaign.status != #active) {
          return #err(#CampaignEnded);
        };

        let currentTime = Time.now();
        if (currentTime > campaign.endDate) {
          return #err(#CampaignEnded);
        };

        // Check if user has enough tokens
        switch (users.get(caller)) {
          case (null) { return #err(#InsufficientFunds) };
          case (?user) {
            if (user.tokenBalance < amount) {
              return #err(#InsufficientFunds);
            };

            // Deduct tokens from user's balance
            let updatedUser : User = {
              id = user.id;
              username = user.username;
              totalDonated = user.totalDonated + amount;
              donationCount = user.donationCount + 1;
              registrationDate = user.registrationDate;
              tokenBalance = user.tokenBalance - amount;
            };
            users.put(caller, updatedUser);
          };
        };

        let donationId = nextDonationId;
        nextDonationId += 1;

        let donation : Donation = {
          id = donationId;
          donorId = caller;
          campaignId = campaignId;
          amount = amount;
          timestamp = currentTime;
          anonymous = anonymous;
        };

        donations.put(donationId, donation);

        // Update campaign raised amount
        let updatedCampaign : Campaign = {
          id = campaign.id;
          title = campaign.title;
          ngoId = campaign.ngoId;
          description = campaign.description;
          purpose = campaign.purpose;
          location = campaign.location;
          targetAmount = campaign.targetAmount;
          raisedAmount = campaign.raisedAmount + amount;
          startDate = campaign.startDate;
          endDate = campaign.endDate;
          status = campaign.status;
        };

        campaigns.put(campaignId, updatedCampaign);

        // Add donor to campaign donors list if not already there
        switch (campaignDonors.get(campaignId)) {
          case (null) {
            campaignDonors.put(campaignId, [caller]);
          };
          case (?existingDonors) {
            if (Option.isNull(Array.find<Principal>(existingDonors, func(x) { Principal.equal(x, caller) }))) {
              let newDonors = Array.append(existingDonors, [caller]);
              campaignDonors.put(campaignId, newDonors);
            };
          };
        };

        // Update donor shares for voting power
        updateCampaignDonorShares(campaignId);

        // Add donation to user's donation list
        switch (userDonations.get(caller)) {
          case (null) {
            userDonations.put(caller, [donationId]);
          };
          case (?existingDonations) {
            let newDonations = Array.append(existingDonations, [donationId]);
            userDonations.put(caller, newDonations);
          };
        };

        return #ok(donationId);
      };
    };
  };

  public query func getUserDonations(userId : Principal) : async Result.Result<[Donation], Error> {
    var donationArray = Buffer.Buffer<Donation>(10);

    switch (userDonations.get(userId)) {
      case (null) { return #ok([]) };
      case (?donationIds) {
        for (donationId in donationIds.vals()) {
          switch (donations.get(donationId)) {
            case (null) { /* Skip if not found */ };
            case (?donation) {
              donationArray.add(donation);
            };
          };
        };
        return #ok(Buffer.toArray(donationArray));
      };
    };
  };

  public query func getCampaignDonations(campaignId : Nat) : async Result.Result<[Donation], Error> {
    var donationArray = Buffer.Buffer<Donation>(10);

    for ((_, donation) in donations.entries()) {
      if (donation.campaignId == campaignId) {
        donationArray.add(donation);
      };
    };

    return #ok(Buffer.toArray(donationArray));
  };

  // Spend Request Functionality
  public shared ({ caller }) func createSpendRequest(
    campaignId : Nat,
    title : Text,
    description : Text,
    amount : Nat,
    recipient : Text,
    purpose : Text,
    votingDuration : Nat // Duration in seconds
  ) : async Result.Result<Nat, Error> {
    // Verify campaign exists and caller is authorized
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?campaign) {
        if (not isAdmin(caller) and not isNgoOwner(campaign.ngoId, caller)) {
          return #err(#NotAuthorized);
        };

        // Check if there are enough funds in the campaign
        if (campaign.raisedAmount < amount) {
          return #err(#InsufficientFunds);
        };

        let requestId = nextSpendRequestId;
        nextSpendRequestId += 1;

        let votingEndTime = Time.now() + (votingDuration * 1_000_000_000); // Convert seconds to nanoseconds

        let spendRequest : SpendRequest = {
          id = requestId;
          campaignId = campaignId;
          title = title;
          description = description;
          amount = amount;
          recipient = recipient;
          purpose = purpose;
          createdBy = caller;
          createdAt = Time.now();
          status = #pending;
          votingEndTime = votingEndTime;
          approvalPercentage = 0.0; // Start with 0% approval
          requiredApprovalPercentage = 50.0; // Require 50% approval to pass
        };

        spendRequests.put(requestId, spendRequest);

        // Notify all donors of the campaign
        notifyAllDonors(
          campaignId,
          "New Spend Request: " # title,
          "A new spend request of " # Nat.toText(amount) # " YGN has been created for campaign " # campaign.title # ". Please vote to approve or reject this request.",
          #spendRequest,
          ?requestId
        );

        return #ok(requestId);
      };
    };
  };

  public shared ({ caller }) func voteOnSpendRequest(requestId : Nat, approve : Bool) : async Result.Result<(), Error> {
    switch (spendRequests.get(requestId)) {
      case (null) { return #err(#NotFound) };
      case (?request) {
        if (Time.now() > request.votingEndTime) {
          return #err(#VotingEnded);
        };

        // Check if donor has voting rights (donated to the campaign)
        let votingPowerPercentage = calculateVotingPower(caller, request.campaignId);
        
        if (votingPowerPercentage <= 0.0) {
          return #err(#NotAuthorized);
        };

        // Calculate voting power as an integer for storage
        let votingPower : Nat = Int.abs(Float.toInt(votingPowerPercentage * 10000.0)); // Store with 4 decimal places precision
        
        // Check if already voted
        let voteKey = Nat.toText(requestId) # "-" # Principal.toText(caller);
        switch (votes.get(voteKey)) {
          case (?_) { return #err(#AlreadyVoted) };
          case (null) {
            // Record the vote
            let vote : Vote = {
              requestId = requestId;
              voter = caller;
              approved = approve;
              votingPower = votingPower;
              timestamp = Time.now();
            };
            
            votes.put(voteKey, vote);
            
            // Recalculate approval percentage
            var totalVotingPower : Float = 0.0;
            var approvalVotingPower : Float = 0.0;
            
            for ((voteId, vote) in votes.entries()) {
              if (Text.startsWith(voteId, #text(Nat.toText(requestId) # "-"))) {
                let power = Float.fromInt(vote.votingPower) / 10000.0; // Convert back to percentage
                totalVotingPower += power;
                
                if (vote.approved) {
                  approvalVotingPower += power;
                };
              };
            };
            
            // Update request approval percentage
            let newApprovalPercentage = if (totalVotingPower > 0.0) {
              (approvalVotingPower / totalVotingPower) * 100.0;
            } else {
              0.0;
            };
            
            let updatedRequest : SpendRequest = {
              id = request.id;
              campaignId = request.campaignId;
              title = request.title;
              description = request.description;
              amount = request.amount;
              recipient = request.recipient;
              purpose = request.purpose;
              createdBy = request.createdBy;
              createdAt = request.createdAt;
              status = request.status;
              votingEndTime = request.votingEndTime;
              approvalPercentage = newApprovalPercentage;
              requiredApprovalPercentage = request.requiredApprovalPercentage;
            };
            
            spendRequests.put(requestId, updatedRequest);
            
            return #ok();
          };
        };
      };
    };
  };

  public shared ({ caller }) func finalizeSpendRequest(requestId : Nat) : async Result.Result<(), Error> {
    switch (spendRequests.get(requestId)) {
      case (null) { return #err(#NotFound) };
      case (?request) {
        if (not isAdmin(caller) and not isNgoOwner(
          switch (campaigns.get(request.campaignId)) {
            case (null) { 0 }; // Should not happen
            case (?campaign) { campaign.ngoId };
          }, 
          caller
        )) {
          return #err(#NotAuthorized);
        };

        // Check if voting has ended
        if (Time.now() < request.votingEndTime) {
          return #err(#NotAuthorized);
        };

        // Update request status based on approval percentage
        let newStatus = if (request.approvalPercentage >= request.requiredApprovalPercentage) {
          #approved
        } else {
          #rejected
        };

        let updatedRequest : SpendRequest = {
          id = request.id;
          campaignId = request.campaignId;
          title = request.title;
          description = request.description;
          amount = request.amount;
          recipient = request.recipient;
          purpose = request.purpose;
          createdBy = request.createdBy;
          createdAt = request.createdAt;
          status = newStatus;
          votingEndTime = request.votingEndTime;
          approvalPercentage = request.approvalPercentage;
          requiredApprovalPercentage = request.requiredApprovalPercentage;
        };

        spendRequests.put(requestId, updatedRequest);

        // If approved, update campaign raised amount
        if (newStatus == #approved) {
          switch (campaigns.get(request.campaignId)) {
            case (null) { /* Should not happen */ };
            case (?campaign) {
              let updatedCampaign : Campaign = {
                id = campaign.id;
                title = campaign.title;
                ngoId = campaign.ngoId;
                description = campaign.description;
                purpose = campaign.purpose;
                location = campaign.location;
                targetAmount = campaign.targetAmount;
                raisedAmount = if (campaign.raisedAmount >= request.amount) {
                  campaign.raisedAmount - request.amount
                } else {
                  0
                };
                startDate = campaign.startDate;
                endDate = campaign.endDate;
                status = campaign.status;
              };

              campaigns.put(campaign.id, updatedCampaign);
              
              // Update request status to executed
              let executedRequest : SpendRequest = {
                id = request.id;
                campaignId = request.campaignId;
                title = request.title;
                description = request.description;
                amount = request.amount;
                recipient = request.recipient;
                purpose = request.purpose;
                createdBy = request.createdBy;
                createdAt = request.createdAt;
                status = #executed;
                votingEndTime = request.votingEndTime;
                approvalPercentage = request.approvalPercentage;
                requiredApprovalPercentage = request.requiredApprovalPercentage;
              };
              
              spendRequests.put(requestId, executedRequest);
            };
          };
        };

        // Notify all donors of the result
        let resultMessage = if (newStatus == #approved) {
          "Spend request \"" # request.title # "\" has been approved with " # Float.toText(request.approvalPercentage) # "% approval. Funds have been released."
        } else {
          "Spend request \"" # request.title # "\" has been rejected with only " # Float.toText(request.approvalPercentage) # "% approval."
        };

        notifyAllDonors(
          request.campaignId,
          "Spend Request " # (if (newStatus == #approved) { "Approved" } else { "Rejected" }),
          resultMessage,
          #spendRequest,
          ?requestId
        );

        return #ok();
      };
    };
  };

  // User Registration and Management
  public shared ({ caller }) func registerUser(username : Text) : async Result.Result<(), Error> {
    switch (users.get(caller)) {
      case (?_) { return #err(#AlreadyExists) };
      case (null) {
        let newUser : User = {
          id = caller;
          username = username;
          totalDonated = 0;
          donationCount = 0;
          registrationDate = Time.now();
          tokenBalance = 0; // Start with 0 YGN tokens
        };

        users.put(caller, newUser);
        return #ok();
      };
    };
  };

  public query func getUser(userId : Principal) : async Result.Result<User, Error> {
    switch (users.get(userId)) {
      case (null) { return #err(#NotFound) };
      case (?user) { return #ok(user) };
    };
  };

  // Notification Management
  public query func getUserNotifications(userId : Principal) : async Result.Result<[Notification], Error> {
    switch (userNotifications.get(userId)) {
      case (null) { return #ok([]) };
      case (?notificationIds) {
        let buffer = Buffer.Buffer<Notification>(notificationIds.size());
        for (notificationId in notificationIds.vals()) {
          switch (notifications.get(notificationId)) {
            case (null) { /* Skip */ };
            case (?notification) {
              buffer.add(notification);
            };
          };
        };
        return #ok(Buffer.toArray(buffer));
      };
    };
  };

  public shared ({ caller }) func markNotificationAsRead(notificationId : Nat) : async Result.Result<(), Error> {
    switch (notifications.get(notificationId)) {
      case (null) { return #err(#NotFound) };
      case (?notification) {
        if (not Principal.equal(notification.userId, caller)) {
          return #err(#NotAuthorized);
        };

        let updatedNotification : Notification = {
          id = notification.id;
          userId = notification.userId;
          title = notification.title;
          message = notification.message;
          timestamp = notification.timestamp;
          read = true;
          actionType = notification.actionType;
          actionId = notification.actionId;
        };

        notifications.put(notificationId, updatedNotification);
        return #ok();
      };
    };
  };

  // Query functions for spend requests
  public query func getSpendRequest(requestId : Nat) : async Result.Result<SpendRequest, Error> {
    switch (spendRequests.get(requestId)) {
      case (null) { return #err(#NotFound) };
      case (?request) { return #ok(request) };
    };
  };

  public query func getCampaignSpendRequests(campaignId : Nat) : async Result.Result<[SpendRequest], Error> {
    let buffer = Buffer.Buffer<SpendRequest>(10);
    
    for ((_, request) in spendRequests.entries()) {
      if (request.campaignId == campaignId) {
        buffer.add(request);
      };
    };
    
    return #ok(Buffer.toArray(buffer));
  };

  public query func getUserVotingPower(userId : Principal, campaignId : Nat) : async Float {
    return calculateVotingPower(userId, campaignId);
  };

  public query func hasUserVoted(userId : Principal, requestId : Nat) : async Bool {
    let voteKey = Nat.toText(requestId) # "-" # Principal.toText(userId);
    return Option.isSome(votes.get(voteKey));
  };

  // Dashboard Stats
  public query func getDashboardStats() : async {
    totalNGOs : Nat;
    totalCampaigns : Nat;
    totalActiveCampaigns : Nat;
    totalCompletedCampaigns : Nat;
    totalDonations : Nat;
    totalRaisedAmount : Nat;
  } {
    var activeCampaigns : Nat = 0;
    var completedCampaigns : Nat = 0;
    var totalRaised : Nat = 0;

    for ((_, campaign) in campaigns.entries()) {
      if (campaign.status == #active) {
        activeCampaigns += 1;
      } else if (campaign.status == #completed) {
        completedCampaigns += 1;
      };
      totalRaised += campaign.raisedAmount;
    };

    return {
      totalNGOs = ngos.size();
      totalCampaigns = campaigns.size();
      totalActiveCampaigns = activeCampaigns;
      totalCompletedCampaigns = completedCampaigns;
      totalDonations = donations.size();
      totalRaisedAmount = totalRaised;
    };
  };

  // System Initialization (for demo)
  public shared ({ caller }) func initializeDemo() : async Result.Result<(), Error> {
    if (not isAdmin(caller)) {
      return #err(#NotAuthorized);
    };

    // Create demo NGOs
    let _ = await createNGO("Clean Earth Initiative", "Focused on environmental cleanup and sustainable practices", "Global");
    let _ = await createNGO("Education for All", "Providing educational resources to underserved communities", "Asia");
    
    // Create demo campaigns
    let _ = await createCampaign(1, "Ocean Cleanup Drive", "Removing plastic from oceans", "Environmental Conservation", 
      "Pacific Ocean", 100000, Time.now() - 30 * 24 * 60 * 60 * 1000000000, Time.now() + 60 * 24 * 60 * 60 * 1000000000);
    
    let _ = await createCampaign(2, "Rural School Development", "Building schools in rural areas", "Education", 
      "Rural India", 200000, Time.now() - 15 * 24 * 60 * 60 * 1000000000, Time.now() + 90 * 24 * 60 * 60 * 1000000000);
    
    return #ok();
  };
}