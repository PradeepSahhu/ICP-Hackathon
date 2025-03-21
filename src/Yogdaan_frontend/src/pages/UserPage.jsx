import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Heart,
  DollarSign,
  PieChart,
  Clock,
  ChevronRight,
  Bell,
  Bookmark,
} from "lucide-react";

const UserProfile = () => {
  // Sample user data
  const userData = {
    name: "Kumar Devashish",
    email: "kumardevashish000@gmail.com",
    joinedDate: "2024-05-15",
    avatar: "/api/placeholder/100/100",
    totalDonated: 5280,
    totalCampaigns: 12,
    approvalRate: 95,
  };

  // Sample holdings data
  const holdingsData = [
    {
      ngoId: 1,
      ngoName: "Green Earth Foundation",
      amount: 1200,
      campaignCount: 3,
    },
    { ngoId: 2, ngoName: "Water for All", amount: 850, campaignCount: 2 },
    {
      ngoId: 3,
      ngoName: "Child Education Fund",
      amount: 1500,
      campaignCount: 4,
    },
    {
      ngoId: 4,
      ngoName: "Disaster Relief Alliance",
      amount: 930,
      campaignCount: 2,
    },
    {
      ngoId: 5,
      ngoName: "Health Access Initiative",
      amount: 800,
      campaignCount: 1,
    },
  ];

  // Sample watchlist data
  const watchlistData = [
    {
      id: 1,
      ngoName: "Green Earth Foundation",
      campaignTitle: "Reforestation Project in Amazon",
      progress: 65,
      endDate: "2025-06-30",
    },
    {
      id: 2,
      ngoName: "Water for All",
      campaignTitle: "Clean Water Wells in Rural Communities",
      progress: 45,
      endDate: "2025-05-15",
    },
    {
      id: 3,
      ngoName: "Health Access Initiative",
      campaignTitle: "Mobile Medical Clinics",
      progress: 70,
      endDate: "2025-08-15",
    },
  ];

  // Sample donation history
  const donationHistory = [
    {
      id: 1,
      ngoName: "Green Earth Foundation",
      campaignTitle: "Reforestation Project in Amazon",
      amount: 500,
      date: "2025-02-15",
    },
    {
      id: 2,
      ngoName: "Water for All",
      campaignTitle: "Clean Water Wells in Rural Communities",
      amount: 350,
      date: "2025-01-20",
    },
    {
      id: 3,
      ngoName: "Child Education Fund",
      campaignTitle: "School Supplies for Underprivileged Children",
      amount: 250,
      date: "2024-12-10",
    },
    {
      id: 4,
      ngoName: "Disaster Relief Alliance",
      campaignTitle: "Hurricane Recovery Support",
      amount: 650,
      date: "2024-11-05",
    },
    {
      id: 5,
      ngoName: "Health Access Initiative",
      campaignTitle: "Mobile Medical Clinics",
      amount: 300,
      date: "2024-10-22",
    },
  ];

  // Sample pending approvals
  const pendingApprovals = [
    {
      id: 1,
      ngoName: "Green Earth Foundation",
      campaignTitle: "Reforestation Project in Amazon",
      requestType: "Equipment Purchase",
      amount: 15000,
      approvalRate: 42,
      date: "2025-03-10",
    },
    {
      id: 2,
      ngoName: "Child Education Fund",
      campaignTitle: "School Supplies for Underprivileged Children",
      requestType: "Textbook Distribution",
      amount: 8500,
      approvalRate: 65,
      date: "2025-03-15",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-white">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-gray-800">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-400">{userData.email}</p>
              <p className="text-gray-400 text-sm">
                Member since {formatDate(userData.joinedDate)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 flex items-center gap-2">
                <DollarSign className="text-green-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Total Donated</p>
                  <p className="text-xl font-bold">
                    ${userData.totalDonated.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 flex items-center gap-2">
                <Heart className="text-red-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Campaigns Supported</p>
                  <p className="text-xl font-bold">{userData.totalCampaigns}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 flex items-center gap-2">
                <PieChart className="text-blue-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Approval Rate</p>
                  <p className="text-xl font-bold">{userData.approvalRate}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="bg-gray-900 border-b border-gray-800 w-full justify-start mb-6">
            <TabsTrigger value="holdings" className="px-4 py-2">
              Holdings
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="px-4 py-2">
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="donations" className="px-4 py-2">
              Donation History
            </TabsTrigger>
            <TabsTrigger value="approvals" className="px-4 py-2">
              Pending Approvals
              {pendingApprovals.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {pendingApprovals.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Current Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdingsData.map((holding) => (
                    <div
                      key={holding.ngoId}
                      className="p-4 border border-gray-800 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{holding.ngoName}</h3>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <span>{holding.campaignCount} campaigns</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${holding.amount.toLocaleString()}
                        </p>
                        <Button
                          variant="link"
                          className="px-0 text-blue-400 -mt-2"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Your Watchlist</CardTitle>
                <Button
                  variant="outline"
                  className="text-sm border-gray-700 hover:bg-gray-800"
                >
                  <Bookmark size={16} className="mr-2" />
                  Add Campaign
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlistData.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-gray-800 rounded-lg"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.campaignTitle}</h3>
                          <p className="text-sm text-gray-400">
                            {item.ngoName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-gray-300 text-xs">
                            <Clock size={12} className="mr-1" />
                            Ends {formatDate(item.endDate)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Donation History</CardTitle>
                <Button
                  variant="outline"
                  className="text-sm border-gray-700 hover:bg-gray-800"
                >
                  See All
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-800">
                        <th className="pb-3 font-medium text-gray-400">
                          Campaign
                        </th>
                        <th className="pb-3 font-medium text-gray-400">NGO</th>
                        <th className="pb-3 font-medium text-gray-400 text-right">
                          Amount
                        </th>
                        <th className="pb-3 font-medium text-gray-400 text-right">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationHistory.map((donation) => (
                        <tr
                          key={donation.id}
                          className="border-b border-gray-800 hover:bg-gray-900/50"
                        >
                          <td className="py-4">
                            <Button
                              variant="link"
                              className="px-0 justify-start text-white hover:text-blue-400"
                            >
                              {donation.campaignTitle}
                            </Button>
                          </td>
                          <td className="py-4 text-gray-400">
                            {donation.ngoName}
                          </td>
                          <td className="py-4 text-right font-medium">
                            ${donation.amount}
                          </td>
                          <td className="py-4 text-right text-gray-400">
                            {formatDate(donation.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div
                        key={approval.id}
                        className="p-4 border border-gray-800 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500 text-black">
                                Pending
                              </Badge>
                              <h3 className="font-medium">
                                {approval.requestType}
                              </h3>
                            </div>
                            <p className="mt-1">{approval.campaignTitle}</p>
                            <p className="text-sm text-gray-400">
                              {approval.ngoName}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Requested on {formatDate(approval.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ${approval.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              Current Approval: {approval.approvalRate}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                            <div
                              className={`h-2 rounded-full ${
                                approval.approvalRate >= 50
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{ width: `${approval.approvalRate}%` }}
                            ></div>
                          </div>
                          <div className="flex space-x-3">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-gray-700 hover:bg-gray-800"
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell size={32} className="mx-auto text-gray-500 mb-2" />
                    <p>No pending approvals</p>
                    <p className="text-sm text-gray-400 mt-1">
                      You'll be notified when NGOs request to use funds you've
                      donated.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
