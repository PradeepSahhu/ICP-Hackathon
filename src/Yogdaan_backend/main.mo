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
    amount : Nat;
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
  };

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #InvalidInput;
    #CampaignEnded;
    #InsufficientFunds;
  };

  // State variables
  private stable var nextNgoId : Nat = 1;
  private stable var nextCampaignId : Nat = 1;
  private stable var nextDonationId : Nat = 1;
  private stable var adminPrincipal : Principal = Principal.fromText("aaaaa-aa"); // Replace with actual admin principal

  private var ngos = HashMap.HashMap<Nat, NGO>(10, Nat.equal, Int.hash);
  private var campaigns = HashMap.HashMap<Nat, Campaign>(10, Nat.equal, Int.hash);
  private var donations = HashMap.HashMap<Nat, Donation>(100, Nat.equal, Int.hash);
  private var pastCampaigns = HashMap.HashMap<Nat, PastCampaign>(50, Nat.equal, Int.hash);
  private var users = HashMap.HashMap<Principal, User>(100, Principal.equal, Principal.hash);
  private var ngoCampaigns = HashMap.HashMap<Nat, [Nat]>(10, Nat.equal, Int.hash);
  private var userDonations = HashMap.HashMap<Principal, [Nat]>(100, Principal.equal, Principal.hash);

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
    // A simple algorithm to calculate NGO rank based on:
    // - Number of completed projects
    // - Number of beneficiaries
    // - Transparency score
    // - Total raised funds

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
    // if (not isAdmin(caller)) {
    //   return #err(#NotAuthorized);
    // };

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
    if (not isAdmin(caller) and not isNgoOwner(ngoId, caller)) {
      return #err(#NotAuthorized);
    };

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
    if (not isAdmin(caller) and not isNgoOwner(ngoId, caller)) {
      // return #err(#NotAuthorized);
    };

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
          case (null) { /* Should not happen */ };
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

  // Donation Functions
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

        // In a real implementation, you would handle the actual token transfer here
        // For simplicity, we're just recording the donation

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

        // Update user donation history
        switch (users.get(caller)) {
          case (null) {
            // Create new user record
            let newUser : User = {
              id = caller;
              username = "Anonymous User"; // Can be updated later
              totalDonated = amount;
              donationCount = 1;
              registrationDate = currentTime;
            };

            users.put(caller, newUser);
          };
          case (?user) {
            // Update existing user record
            let updatedUser : User = {
              id = user.id;
              username = user.username;
              totalDonated = user.totalDonated + amount;
              donationCount = user.donationCount + 1;
              registrationDate = user.registrationDate;
            };

            users.put(caller, updatedUser);
          };
        };

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
            case (null) { /* Skip */ };
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
    switch (campaigns.get(campaignId)) {
      case (null) { return #err(#NotFound) };
      case (?_) {
        var donationArray = Buffer.Buffer<Donation>(10);

        for ((_, donation) in donations.entries()) {
          if (donation.campaignId == campaignId) {
            donationArray.add(donation);
          };
        };

        return #ok(Buffer.toArray(donationArray));
      };
    };
  };

  // User Profile Management
  public shared ({ caller }) func updateUserProfile(username : Text) : async Result.Result<(), Error> {
    switch (users.get(caller)) {
      case (null) {
        // Create new user
        let newUser : User = {
          id = caller;
          username = username;
          totalDonated = 0;
          donationCount = 0;
          registrationDate = Time.now();
        };

        users.put(caller, newUser);
      };
      case (?user) {
        // Update existing user
        let updatedUser : User = {
          id = user.id;
          username = username;
          totalDonated = user.totalDonated;
          donationCount = user.donationCount;
          registrationDate = user.registrationDate;
        };

        users.put(caller, updatedUser);
      };
    };

    return #ok();
  };

  public query func getUserProfile(userId : Principal) : async Result.Result<User, Error> {
    switch (users.get(userId)) {
      case (null) { return #err(#NotFound) };
      case (?user) { return #ok(user) };
    };
  };

  // Analytics
  public query func getTopCampaigns(limit : Nat) : async [Campaign] {
    let allCampaigns = Buffer.Buffer<Campaign>(campaigns.size());
    for ((_, campaign) in campaigns.entries()) {
      if (campaign.status == #active) {
        allCampaigns.add(campaign);
      };
    };

    let sortedCampaigns = Buffer.toArray(allCampaigns);
    // Sort by raised amount (descending)
    // Note: This is a simplified sorting mechanism
    let sortedByRaised = Array.sort(
      sortedCampaigns,
      func(a : Campaign, b : Campaign) : { #less; #equal; #greater } {
        if (a.raisedAmount > b.raisedAmount) { #less } else if (a.raisedAmount < b.raisedAmount) {
          #greater;
        } else { #equal };
      },
    );

    // Take only the specified limit
    let actualLimit = if (sortedByRaised.size() < limit) {
      sortedByRaised.size();
    } else { limit };
    let result = Array.subArray(sortedByRaised, 0, actualLimit);

    return result;
  };

  public query func getTopNGOs(limit : Nat) : async [NGO] {
    let allNGOs = Buffer.Buffer<NGO>(ngos.size());
    for ((_, ngo) in ngos.entries()) {
      allNGOs.add(ngo);
    };

    let sortedNGOs = Buffer.toArray(allNGOs);
    // Sort by rank (ascending, as lower rank number is better)
    let sortedByRank = Array.sort(
      sortedNGOs,
      func(a : NGO, b : NGO) : { #less; #equal; #greater } {
        if (a.rank < b.rank) { #less } else if (a.rank > b.rank) { #greater } else {
          #equal;
        };
      },
    );

    // Take only the specified limit
    let actualLimit = if (sortedByRank.size() < limit) { sortedByRank.size() } else {
      limit;
    };
    let result = Array.subArray(sortedByRank, 0, actualLimit);

    return result;
  };

  // System Initialization for Testing
  public shared ({ caller }) func initializeTestData() : async Result.Result<(), Error> {
    if (not isAdmin(caller)) {
      return #err(#NotAuthorized);
    };

    // Create sample NGOs
    let ngo1 = createNGO("Water For All Foundation", "Providing clean drinking water to rural communities affected by drought and water pollution.", "Maharashtra, India");
    let ngo2 = createNGO("Bright Future Trust", "Building schools and providing educational materials for underprivileged children in remote areas.", "Rajasthan, India");
    let ngo3 = createNGO("Health First Alliance", "Providing essential medical services and supplies to remote villages with limited access to healthcare facilities.", "Assam, India");

    // Set NGO stats
    ignore updateNGO(1, "Water For All Foundation", "Providing clean drinking water to rural communities affected by drought and water pollution.", "Maharashtra, India", 12, 45000, 85, true);
    ignore updateNGO(2, "Bright Future Trust", "Building schools and providing educational materials for underprivileged children in remote areas.", "Rajasthan, India", 18, 72000, 90, true);
    ignore updateNGO(3, "Health First Alliance", "Providing essential medical services and supplies to remote villages with limited access to healthcare facilities.", "Assam, India", 8, 23000, 80, true);

    // Create sample campaigns
    let now = Time.now();
    let oneMonth = 30 * 24 * 60 * 60 * 1000000000; // 30 days in nanoseconds
    let twoMonths = 2 * oneMonth;
    let threeMonths = 3 * oneMonth;

    ignore createCampaign(1, "Clean Water Initiative", "Providing clean drinking water to rural communities affected by drought and water pollution. This initiative aims to install water purification systems in 50 villages.", "Water & Sanitation", "Maharashtra, India", 250000, now, now + twoMonths);
    ignore createCampaign(2, "Education for Every Child", "Building schools and providing educational materials for underprivileged children in remote areas. Our goal is to reach 100 new children this year.", "Education", "Rajasthan, India", 400000, now, now + threeMonths);
    ignore createCampaign(3, "Healthcare for Remote Villages", "Providing essential medical services and supplies to remote villages with limited access to healthcare facilities.", "Healthcare", "Assam, India", 150000, now, now + oneMonth);

    // Create some past campaigns
    let pastCampaign1 : PastCampaign = {
      id = 101;
      title = "Rural School Development";
      ngoId = 2;
      raisedAmount = 180000;
      beneficiaries = 2400;
      year = "2024";
      status = "Completed";
    };

    let pastCampaign2 : PastCampaign = {
      id = 102;
      title = "Teacher Training Program";
      ngoId = 2;
      raisedAmount = 120000;
      beneficiaries = 650;
      year = "2023";
      status = "Completed";
    };

    let pastCampaign3 : PastCampaign = {
      id = 103;
      title = "School Supply Drive";
      ngoId = 2;
      raisedAmount = 85000;
      beneficiaries = 3200;
      year = "2023";
      status = "Completed";
    };

    pastCampaigns.put(101, pastCampaign1);
    pastCampaigns.put(102, pastCampaign2);
    pastCampaigns.put(103, pastCampaign3);

    // Simulate some donations to active campaigns
    let testPrincipal = Principal.fromText("aaaaa-aa"); // Test principal for donations

    let donation1 : Donation = {
      id = 1;
      donorId = testPrincipal;
      campaignId = 1;
      amount = 123450;
      timestamp = now - oneMonth / 2;
      anonymous = false;
    };

    let donation2 : Donation = {
      id = 2;
      donorId = testPrincipal;
      campaignId = 2;
      amount = 289700;
      timestamp = now - oneMonth / 3;
      anonymous = true;
    };

    let donation3 : Donation = {
      id = 3;
      donorId = testPrincipal;
      campaignId = 3;
      amount = 87200;
      timestamp = now - oneMonth / 4;
      anonymous = false;
    };

    donations.put(1, donation1);
    donations.put(2, donation2);
    donations.put(3, donation3);

    // Update campaign raised amounts
    switch (campaigns.get(1)) {
      case (null) {};
      case (?campaign) {
        let updatedCampaign = {
          id = campaign.id;
          title = campaign.title;
          ngoId = campaign.ngoId;
          description = campaign.description;
          purpose = campaign.purpose;
          location = campaign.location;
          targetAmount = campaign.targetAmount;
          raisedAmount = 123450;
          startDate = campaign.startDate;
          endDate = campaign.endDate;
          status = campaign.status;
        };
        campaigns.put(1, updatedCampaign);
      };
    };

    switch (campaigns.get(2)) {
      case (null) {};
      case (?campaign) {
        let updatedCampaign = {
          id = campaign.id;
          title = campaign.title;
          ngoId = campaign.ngoId;
          description = campaign.description;
          purpose = campaign.purpose;
          location = campaign.location;
          targetAmount = campaign.targetAmount;
          raisedAmount = 289700;
          startDate = campaign.startDate;
          endDate = campaign.endDate;
          status = campaign.status;
        };
        campaigns.put(2, updatedCampaign);
      };
    };

    switch (campaigns.get(3)) {
      case (null) {};
      case (?campaign) {
        let updatedCampaign = {
          id = campaign.id;
          title = campaign.title;
          ngoId = campaign.ngoId;
          description = campaign.description;
          purpose = campaign.purpose;
          location = campaign.location;
          targetAmount = campaign.targetAmount;
          raisedAmount = 87200;
          startDate = campaign.startDate;
          endDate = campaign.endDate;
          status = campaign.status;
        };
        campaigns.put(3, updatedCampaign);
      };
    };

    // Create a test user
    let testUser : User = {
      id = testPrincipal;
      username = "Test Donor";
      totalDonated = 123450 + 289700 + 87200;
      donationCount = 3;
      registrationDate = now - oneMonth;
    };

    users.put(testPrincipal, testUser);

    // Add donations to user's donation list
    userDonations.put(testPrincipal, [1, 2, 3]);

    // Add campaigns to NGO campaign lists
    ngoCampaigns.put(1, [1]);
    ngoCampaigns.put(2, [2, 101, 102, 103]);
    ngoCampaigns.put(3, [3]);

    // Recalculate NGO ranks
    let ngo1Rank = calculateNGORank(1);
    let ngo2Rank = calculateNGORank(2);
    let ngo3Rank = calculateNGORank(3);

    switch (ngos.get(1)) {
      case (null) {};
      case (?ngo) {
        let updatedNGO = {
          id = ngo.id;
          name = ngo.name;
          description = ngo.description;
          location = ngo.location;
          completedProjects = ngo.completedProjects;
          beneficiaries = ngo.beneficiaries;
          rank = ngo1Rank;
          transparencyScore = ngo.transparencyScore;
          verified = ngo.verified;
        };
        ngos.put(1, updatedNGO);
      };
    };

    switch (ngos.get(2)) {
      case (null) {};
      case (?ngo) {
        let updatedNGO = {
          id = ngo.id;
          name = ngo.name;
          description = ngo.description;
          location = ngo.location;
          completedProjects = ngo.completedProjects;
          beneficiaries = ngo.beneficiaries;
          rank = ngo2Rank;
          transparencyScore = ngo.transparencyScore;
          verified = ngo.verified;
        };
        ngos.put(2, updatedNGO);
      };
    };

    switch (ngos.get(3)) {
      case (null) {};
      case (?ngo) {
        let updatedNGO = {
          id = ngo.id;
          name = ngo.name;
          description = ngo.description;
          location = ngo.location;
          completedProjects = ngo.completedProjects;
          beneficiaries = ngo.beneficiaries;
          rank = ngo3Rank;
          transparencyScore = ngo.transparencyScore;
          verified = ngo.verified;
        };
        ngos.put(3, updatedNGO);
      };
    };

    return #ok();
  };

  // Additional platform statistics
  public query func getPlatformStats() : async {
    totalNGOs : Nat;
    totalCampaigns : Nat;
    totalActiveCampaigns : Nat;
    totalCompletedCampaigns : Nat;
    totalDonations : Nat;
    totalDonationAmount : Nat;
  } {
    var activeCampaigns = 0;
    var completedCampaigns = 0;
    var totalDonationAmount = 0;

    for ((_, campaign) in campaigns.entries()) {
      if (campaign.status == #active) {
        activeCampaigns += 1;
      } else if (campaign.status == #completed) {
        completedCampaigns += 1;
      };
    };

    completedCampaigns += pastCampaigns.size();

    for ((_, donation) in donations.entries()) {
      totalDonationAmount += donation.amount;
    };

    return {
      totalNGOs = ngos.size();
      totalCampaigns = campaigns.size() + pastCampaigns.size();
      totalActiveCampaigns = activeCampaigns;
      totalCompletedCampaigns = completedCampaigns;
      totalDonations = donations.size();
      totalDonationAmount = totalDonationAmount;
    };
  };

  // Search functionality
  public query func searchCampaigns(queries : Text) : async [Campaign] {
    let buffer = Buffer.Buffer<Campaign>(0);
    let lowerQuery = Text.toLowercase(queries);

    for ((_, campaign) in campaigns.entries()) {
      let lowerTitle = Text.toLowercase(campaign.title);
      let lowerDescription = Text.toLowercase(campaign.description);
      let lowerPurpose = Text.toLowercase(campaign.purpose);
      let lowerLocation = Text.toLowercase(campaign.location);

      if (
        Text.contains(lowerTitle, #text lowerQuery) or
        Text.contains(lowerDescription, #text lowerQuery) or
        Text.contains(lowerPurpose, #text lowerQuery) or
        Text.contains(lowerLocation, #text lowerQuery)
      ) {
        buffer.add(campaign);
      };
    };

    return Buffer.toArray(buffer);
  };

  public query func searchNGOs(queries : Text) : async [NGO] {
    let buffer = Buffer.Buffer<NGO>(0);
    let lowerQuery = Text.toLowercase(queries);

    for ((_, ngo) in ngos.entries()) {
      let lowerName = Text.toLowercase(ngo.name);
      let lowerDescription = Text.toLowercase(ngo.description);
      let lowerLocation = Text.toLowercase(ngo.location);

      if (
        Text.contains(lowerName, #text lowerQuery) or
        Text.contains(lowerDescription, #text lowerQuery) or
        Text.contains(lowerLocation, #text lowerQuery)
      ) {
        buffer.add(ngo);
      };
    };

    return Buffer.toArray(buffer);
  };

  // Filter campaigns by category/purpose
  public query func getCampaignsByPurpose(purpose : Text) : async [Campaign] {
    let buffer = Buffer.Buffer<Campaign>(0);
    let lowerPurpose = Text.toLowercase(purpose);

    for ((_, campaign) in campaigns.entries()) {
      let campaignPurpose = Text.toLowercase(campaign.purpose);

      if (Text.contains(campaignPurpose, #text lowerPurpose)) {
        buffer.add(campaign);
      };
    };

    return Buffer.toArray(buffer);
  };

  // Get campaigns by location
  public query func getCampaignsByLocation(location : Text) : async [Campaign] {
    let buffer = Buffer.Buffer<Campaign>(0);
    let lowerLocation = Text.toLowercase(location);

    for ((_, campaign) in campaigns.entries()) {
      let campaignLocation = Text.toLowercase(campaign.location);

      if (Text.contains(campaignLocation, #text lowerLocation)) {
        buffer.add(campaign);
      };
    };

    return Buffer.toArray(buffer);
  };

  // Preupgrade and postupgrade system hooks for stable storage
  system func preupgrade() {
    // This method is called before upgrading the canister
    // Any additional state migration could be added here
  };

  system func postupgrade() {
    // This method is called after upgrading the canister
    // Any post-upgrade initialization could be done here
  };
};
