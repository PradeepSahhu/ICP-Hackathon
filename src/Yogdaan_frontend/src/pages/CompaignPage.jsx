import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Calendar, Users, DollarSign, MapPin, Award } from "lucide-react";

const CampaignPage = () => {
  const [hoveredCampaign, setHoveredCampaign] = useState(null);
  const navigate = useNavigate();

  // Sample data for NGO campaigns
  const campaigns = [
    {
      id: 1,
      ngoId: 1,
      ngoName: "Green Earth Foundation",
      ngoRank: 1,
      title: "Reforestation Project in Amazon",
      description:
        "Plant 10,000 trees in deforested areas of the Amazon rainforest to restore wildlife habitats and combat climate change.",
      endDate: "2025-06-30",
      location: "Brazil",
      totalFunds: 125000,
      targetFunds: 200000,
      image: "/api/placeholder/120/80",
      banner: "/api/placeholder/400/200",
    },
    {
      id: 2,
      ngoId: 2,
      ngoName: "Water for All",
      ngoRank: 2,
      title: "Clean Water Wells in Rural Communities",
      description:
        "Construct 50 water wells in drought-affected villages to provide clean drinking water to over 10,000 people.",
      endDate: "2025-05-15",
      location: "Kenya",
      totalFunds: 85000,
      targetFunds: 150000,
      image: "/api/placeholder/120/80",
      banner: "/api/placeholder/400/200",
    },
    {
      id: 3,
      ngoId: 3,
      ngoName: "Child Education Fund",
      ngoRank: 3,
      title: "School Supplies for Underprivileged Children",
      description:
        "Provide essential school supplies, textbooks, and backpacks to 5,000 children from low-income households.",
      endDate: "2025-07-10",
      location: "India",
      totalFunds: 62000,
      targetFunds: 100000,
      image: "/api/placeholder/120/80",
      banner: "/api/placeholder/400/200",
    },
    {
      id: 4,
      ngoId: 4,
      ngoName: "Disaster Relief Alliance",
      ngoRank: 4,
      title: "Hurricane Recovery Support",
      description:
        "Provide emergency shelter, food, and medical supplies to communities affected by recent hurricane devastation.",
      endDate: "2025-04-30",
      location: "Caribbean Islands",
      totalFunds: 230000,
      targetFunds: 300000,
      image: "/api/placeholder/120/80",
      banner: "/api/placeholder/400/200",
    },
    {
      id: 5,
      ngoId: 5,
      ngoName: "Health Access Initiative",
      ngoRank: 5,
      title: "Mobile Medical Clinics",
      description:
        "Fund 10 mobile medical clinics to reach remote communities with essential healthcare services and vaccinations.",
      endDate: "2025-08-15",
      location: "Multiple African countries",
      totalFunds: 175000,
      targetFunds: 250000,
      image: "/api/placeholder/120/80",
      banner: "/api/placeholder/400/200",
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

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header would be reused across pages */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Yogdaan</h1>
          </div>

          <nav className="flex-1 flex justify-center space-x-8">
            <a
              href="/ngo-rankings"
              className="hover:text-gray-300 transition-colors"
            >
              NGO Rankings
            </a>
            <a
              href="/campaign"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Campaign
            </a>
            <a href="/trade" className="hover:text-gray-300 transition-colors">
              Trade
            </a>
          </nav>

          <div className="flex-1 flex justify-end">
            {/* Profile and search components would go here */}
          </div>
        </div>
      </header>

      {/* Campaigns Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Active Campaigns</h2>
            <Button className="bg-white text-black hover:bg-gray-200">
              Start a Campaign
            </Button>
          </div>

          <div className="space-y-6 text-white">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="relative text-white">
                <Card
                  className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer text-white"
                  onMouseEnter={() => setHoveredCampaign(campaign.id)}
                  onMouseLeave={() => setHoveredCampaign(null)}
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {campaign.title}
                        </h3>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <span>By </span>
                          <span className="ml-1 text-white">
                            {campaign.ngoName}
                          </span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Rank #{campaign.ngoRank}
                          </Badge>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm space-x-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Ends {formatDate(campaign.endDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{campaign.location}</span>
                          </div>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
                          <div
                            className="bg-white h-2.5 rounded-full"
                            style={{
                              width: `${
                                (campaign.totalFunds / campaign.targetFunds) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center">
                            <span>
                              YGM {campaign.totalFunds.toLocaleString()} raised
                            </span>
                          </div>
                          <span className="text-gray-400">
                            YGM {campaign.targetFunds.toLocaleString()} goal
                          </span>
                        </div>
                      </div>

                      <div className="ml-6 flex items-start justify-between">
                        <Button
                          className="bg-white text-black hover:bg-gray-200 ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle donation logic
                          }}
                        >
                          Donate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expanded hover view */}
                {hoveredCampaign === campaign.id && (
                  <div className="absolute left-0 right-0 top-0 z-10">
                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="flex-1">
                            <img
                              src={campaign.banner}
                              alt={campaign.title}
                              className="w-full h-48 object-cover rounded-md mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2">
                              {campaign.title}
                            </h3>

                            <div className="flex items-center mb-4">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={campaign.image}
                                  alt={campaign.ngoName}
                                />
                                <AvatarFallback className="bg-gray-700">
                                  {campaign.ngoName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {campaign.ngoName}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  Rank #{campaign.ngoRank}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-gray-300 mb-4">
                              {campaign.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center text-gray-400 text-sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>Ends {formatDate(campaign.endDate)}</span>
                              </div>
                              <div className="flex items-center text-gray-400 text-sm">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{campaign.location}</span>
                              </div>
                              <div className="flex items-center text-gray-400 text-sm">
                                <DollarSign className="h-4 w-4 mr-2" />
                                <span>
                                  ${campaign.totalFunds.toLocaleString()} raised
                                </span>
                              </div>
                              <div className="flex items-center text-gray-400 text-sm">
                                <Users className="h-4 w-4 mr-2" />
                                <span>
                                  {Math.floor(campaign.totalFunds / 50)} donors
                                </span>
                              </div>
                            </div>

                            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
                              <div
                                className="bg-white h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (campaign.totalFunds /
                                      campaign.targetFunds) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>

                            <div className="flex justify-between items-center text-sm mb-4">
                              <span className="font-medium">
                                {Math.round(
                                  (campaign.totalFunds / campaign.targetFunds) *
                                    100
                                )}
                                % funded
                              </span>
                              <span className="text-gray-400">
                                ${campaign.targetFunds.toLocaleString()} goal
                              </span>
                            </div>

                            <Button
                              className="bg-white text-black hover:bg-gray-200 w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle donation logic
                              }}
                            >
                              Donate Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignPage;
