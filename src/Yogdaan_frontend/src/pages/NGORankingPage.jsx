import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent } from "../components/ui/card";
import { Yogdaan_backend } from "../../../declarations/Yogdaan_backend";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const NgoRankingsPage = () => {
  const [hoveredNgo, setHoveredNgo] = useState(null);

  const [topNgo, setTopNgo] = useState(null);

  // Sample data for top NGOs
  const topNgos = [
    {
      id: 1,
      name: "Green Earth Foundation",
      rank: 1,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 2,
      name: "Water for All",
      rank: 2,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 3,
      name: "Child Education Fund",
      rank: 3,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 4,
      name: "Disaster Relief Alliance",
      rank: 4,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 5,
      name: "Health Access Initiative",
      rank: 5,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
  ];

  // Sample data for all NGOs
  const allNgos = [
    ...topNgos,
    {
      id: 6,
      name: "Animal Rescue Network",
      rank: 6,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 7,
      name: "Clean Ocean Project",
      rank: 7,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 8,
      name: "Food Bank Coalition",
      rank: 8,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 9,
      name: "Renewable Energy Trust",
      rank: 9,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
    {
      id: 10,
      name: "Refugee Support Network",
      rank: 10,
      image: "/api/placeholder/60/60",
      banner: "/api/placeholder/300/100",
    },
  ];

  const getTheNGORankings = async () => {
    const data = await Yogdaan_backend.getTopNGOs(10);
    setTopNgo(data);

    // console.table([data]);

    console.log(topNgo);
  };

  useEffect(() => {
    const callingFunction = async () => {
      await getTheNGORankings();
    };
    callingFunction();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with navigation - would be reused across pages */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Yogdaan</h1>
          </div>

          <nav className="flex-1 flex justify-center space-x-8">
            <a
              href="/ngo-rankings"
              className="text-white hover:text-gray-300 transition-colors"
            >
              NGO Rankings
            </a>
            <a
              href="/campaign"
              className="hover:text-gray-300 transition-colors"
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

      {/* Top NGOs Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Top NGOs</h2>

          <div className="flex justify-center space-x-12 mb-16">
            {topNgo &&
              topNgo.map((ngo) => (
                <div
                  key={parseInt(Number(ngo.id))}
                  className="flex flex-col items-center"
                  // onMouseEnter={() => setHoveredNgo(ngo.id)}
                  // onMouseLeave={() => setHoveredNgo(null)}
                >
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-white">
                      {/* <AvatarImage src={ngo.image} alt={ngo.name} /> */}
                      <AvatarFallback className="bg-gray-700 text-2xl">
                        {String.toLocaleString(ngo.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute -bottom-2 -right-2 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold">
                      {parseInt(Number(ngo.id))}
                    </div>
                  </div>

                  <span className="mt-4 font-medium">{ngo.name}</span>

                  {hoveredNgo === ngo.id && (
                    <div className="absolute mt-32 z-10">
                      <Card className="bg-gray-900 border-gray-700 w-64">
                        <CardContent className="p-4">
                          {/* <img
                            src={ngo.banner}
                            alt={`${String.toLocaleString(ngo.name)} banner`}
                            className="w-full h-20 object-cover mb-2"
                          /> */}
                          <h3 className="font-bold">
                            {String.toLocaleString(ngo.name)}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Rank: #{parseInt(Number(ngo.rank))}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            {!topNgo &&
              topNgos &&
              topNgos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="flex flex-col items-center"
                  onMouseEnter={() => setHoveredNgo(ngo.id)}
                  onMouseLeave={() => setHoveredNgo(null)}
                >
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-white">
                      <AvatarImage src={ngo.image} alt={ngo.name} />
                      <AvatarFallback className="bg-gray-700 text-2xl">
                        {ngo.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    {/* Rank badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold">
                      {parseInt(Number(ngo.rank))}
                    </div>
                  </div>

                  <span className="mt-4 font-medium">{ngo.name}</span>

                  {/* Hover banner */}
                  {hoveredNgo === ngo.id && (
                    <div className="absolute mt-32 z-10">
                      <Card className="bg-gray-900 border-gray-700 w-64">
                        <CardContent className="p-4">
                          <img
                            src={ngo.banner}
                            alt={`${ngo.name} banner`}
                            className="w-full h-20 object-cover mb-2"
                          />
                          <h3 className="font-bold">{ngo.name}</h3>
                          <p className="text-sm text-gray-400">
                            Rank: #{ngo.rank}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All NGOs Ranking Table */}
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">All NGO Rankings</h2>

          <Card className="bg-black border-gray-800 text-white">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">NGO</TableHead>
                  <TableHead className="text-white">Impact Score</TableHead>
                  <TableHead className="text-white">
                    Donor Approval Rate
                  </TableHead>
                  <TableHead className="text-white">Funds Raised</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allNgos &&
                  allNgos.map((ngo) => (
                    <TableRow
                      key={parseInt(Number(ngo.id))}
                      className="border-gray-800 hover:bg-gray-900 text-white"
                      onMouseEnter={() =>
                        setHoveredNgo(parseInt(Number(ngo.id)) + "-table")
                      }
                      onMouseLeave={() => setHoveredNgo(null)}
                    >
                      <TableCell className="font-medium text-white">
                        {parseInt(Number(ngo.rank))}
                      </TableCell>
                      <TableCell className="relative">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            {/* <AvatarImage src={ngo.image} alt={ngo.name} /> */}
                            <AvatarFallback className="bg-gray-700">
                              {String.toLocaleString(ngo.name)}
                            </AvatarFallback>
                          </Avatar>
                          {ngo.name}
                        </div>

                        {/* Hover banner */}
                        {hoveredNgo === parseInt(Number(ngo.id)) + "-table" && (
                          <div className="absolute left-32 top-0 z-10">
                            <Card className="bg-gray-900 border-gray-700 w-64 text-white">
                              <CardContent className="p-4">
                                {/* <img
                                  src={ngo.banner}
                                  alt={`${ngo.name} banner`}
                                  className="w-full h-20 object-cover mb-2"
                                /> */}
                                <h3 className="font-bold">
                                  {String.toLocaleString(ngo.name)}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  Rank: #{parseInt(Number(ngo.rank))}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {95 - parseInt(Number(ngo.rank)) * 3}%
                      </TableCell>
                      <TableCell>
                        {98 - parseInt(Number(ngo.rank)) * 2}%
                      </TableCell>
                      <TableCell>
                        $
                        {(
                          1000000 / parseInt(Number(ngo.rank))
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default NgoRankingsPage;
