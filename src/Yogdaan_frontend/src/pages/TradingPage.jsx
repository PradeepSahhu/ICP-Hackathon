import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  User,
  Home,
  Award,
  Heart,
  BookOpen,
  AlertCircle,
  DollarSign,
  Eye,
  Bookmark,
  ArrowUpRight,
  ChevronRight,
  Filter,
  BarChart3,
} from "lucide-react";

const InvestmentPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts and tables
  const performanceData = [
    { name: "Jan", value: 500 },
    { name: "Feb", value: 800 },
    { name: "Mar", value: 1200 },
    { name: "Apr", value: 900 },
    { name: "May", value: 1500 },
    { name: "Jun", value: 2000 },
  ];

  const investmentOpportunities = [
    {
      id: 1,
      name: "Clean Water Initiative",
      ngo: "WaterWorks Foundation",
      impact: "High",
      minAmount: 100,
      duration: "3 months",
      returns: "8%",
      risk: "Low",
    },
    {
      id: 2,
      name: "Solar Energy for Villages",
      ngo: "SunPower NGO",
      impact: "Medium",
      minAmount: 250,
      duration: "6 months",
      returns: "12%",
      risk: "Medium",
    },
    {
      id: 3,
      name: "Education Technology Fund",
      ngo: "EduForAll",
      impact: "Very High",
      minAmount: 500,
      duration: "12 months",
      returns: "15%",
      risk: "Medium",
    },
    {
      id: 4,
      name: "Healthcare Access Project",
      ngo: "MedHelp",
      impact: "High",
      minAmount: 200,
      duration: "4 months",
      returns: "7%",
      risk: "Low",
    },
  ];

  const portfolioItems = [
    {
      id: 1,
      name: "Clean Water Initiative",
      amount: 500,
      date: "2025-01-15",
      returns: 40,
      status: "Active",
    },
    {
      id: 2,
      name: "Solar Energy for Villages",
      amount: 750,
      date: "2025-02-10",
      returns: 67.5,
      status: "Active",
    },
    {
      id: 3,
      name: "Micro-Loans Program",
      amount: 300,
      date: "2024-12-05",
      returns: 24,
      status: "Completed",
    },
  ];

  const watchlistItems = [
    {
      id: 1,
      name: "Healthcare Access Project",
      ngo: "MedHelp",
      minAmount: 200,
      returns: "7%",
      endDate: "2025-06-15",
    },
    {
      id: 2,
      name: "Education Technology Fund",
      ngo: "EduForAll",
      minAmount: 500,
      returns: "15%",
      endDate: "2025-08-30",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation bar component would be here */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Investment Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-gray-800"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-gray-800"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Investment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$1,550.00</div>
              <p className="text-green-500 text-sm mt-1">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Total Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$131.50</div>
              <p className="text-green-500 text-sm mt-1">
                +8.5% overall return
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm">
                Impact Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78/100</div>
              <p className="text-blue-500 text-sm mt-1">High positive impact</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full bg-gray-900">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your investment growth over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          borderColor: "#444",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Impact Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Education</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>

                      <div className="flex justify-between">
                        <span>Clean Water</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>

                      <div className="flex justify-between">
                        <span>Renewable Energy</span>
                        <span>22%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: "22%" }}
                        ></div>
                      </div>

                      <div className="flex justify-between">
                        <span>Healthcare</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-between">
                      Explore New Opportunities
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-gray-800 flex items-center justify-between"
                    >
                      Manage Portfolio
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-gray-800 flex items-center justify-between"
                    >
                      View Transaction History
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Investment Opportunities</h2>
              <div className="flex gap-4">
                <Input
                  placeholder="Search opportunities..."
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button className="bg-white text-black hover:bg-gray-200">
                  Search
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {investmentOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all"
                >
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{opportunity.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          by {opportunity.ngo}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-white text-white px-3 py-1"
                      >
                        {opportunity.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Minimum Investment</p>
                        <p className="font-semibold">
                          ${opportunity.minAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Duration</p>
                        <p className="font-semibold">{opportunity.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Expected Returns</p>
                        <p className="font-semibold text-green-500">
                          {opportunity.returns}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Risk Level</p>
                        <p className="font-semibold">{opportunity.risk}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-gray-800"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-gray-800"
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Add to Watchlist
                      </Button>
                      <Button className="bg-white text-black hover:bg-gray-200">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Invest Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>My Investment Portfolio</CardTitle>
                <CardDescription className="text-gray-400">
                  Track your current investments and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800">
                      <TableHead>Investment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Returns</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-gray-800 hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>${item.amount.toFixed(2)}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="text-green-500">
                          ${item.returns.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "Active" ? "default" : "secondary"
                            }
                            className={`${
                              item.status === "Active"
                                ? "bg-green-800 hover:bg-green-700"
                                : "bg-gray-600 hover:bg-gray-500"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-white text-white hover:bg-gray-800"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-gray-800"
                >
                  Export Data
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-900 border-gray-800 mt-6">
              <CardHeader>
                <CardTitle>Impact Report</CardTitle>
                <CardDescription className="text-gray-400">
                  The social and environmental impact of your investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-4xl font-bold">357</div>
                    <p className="text-gray-400 mt-2">
                      People provided with clean water
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-4xl font-bold">42</div>
                    <p className="text-gray-400 mt-2">
                      Children supported with education
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-4xl font-bold">1.2t</div>
                    <p className="text-gray-400 mt-2">CO2 emissions reduced</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Your Watchlist</CardTitle>
                    <CardDescription className="text-gray-400">
                      Projects you're monitoring for potential investment
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-gray-800"
                  >
                    Manage Watchlist
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {watchlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {watchlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b border-gray-800 pb-4"
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm">{item.ngo}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">
                            Min. Investment
                          </p>
                          <p className="font-medium">${item.minAmount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Returns</p>
                          <p className="font-medium text-green-500">
                            {item.returns}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">End Date</p>
                          <p className="font-medium">{item.endDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-white text-white hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-white text-black hover:bg-gray-200"
                          >
                            Invest
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">
                      No items in watchlist
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Add projects you're interested in to monitor their
                      progress
                    </p>
                    <Button className="mt-4 bg-white text-black hover:bg-gray-200">
                      Explore Projects
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 mt-6">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription className="text-gray-400">
                  Based on your investment history and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {investmentOpportunities.slice(0, 2).map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          {opportunity.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-xs">
                          by {opportunity.ngo}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm pb-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">
                            Min: ${opportunity.minAmount}
                          </span>
                          <span className="text-green-500">
                            Returns: {opportunity.returns}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-gray-700 w-full"
                        >
                          Add to Watchlist
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentPage;
