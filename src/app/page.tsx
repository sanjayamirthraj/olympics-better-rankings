import countries from "@/app/api/countries.json";
import MenuBar from "@/components/ui/navigationbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const GOLD = 1027;
const SILVER = 535;
const BRONZE = 4.6;

const fetchMedalData = async (countryCode: string | null) => {
  const response = await fetch(
    `https://api.olympics.kevle.xyz/medals?country=${countryCode}`
  );
  const data = await response.json();
  return data;
};

const medalDataArray = await Promise.all(
  countries.map(async (country) => {
    const medalData = await fetchMedalData(country.fifa_code);
    const gold = medalData?.results[0]?.medals?.gold || 0;
    const silver = medalData?.results[0]?.medals?.silver || 0;
    const bronze = medalData?.results[0]?.medals?.bronze || 0;
    const totalValue = (
      gold * GOLD +
      silver * SILVER +
      bronze * BRONZE
    ).toFixed(2);
    const originalRank = medalData?.results[0]?.rank;
    return {
      country,
      totalValue,
      gold,
      silver,
      bronze,
      originalRank,
      rank: 0,
    };
  })
);

medalDataArray.push();

const sortedCountries = medalDataArray
  .filter(
    (country) => country.gold > 0 || country.silver > 0 || country.bronze > 0
  )
  .sort((a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue));

sortedCountries.forEach((country) => {
  console.log(country.country.country_name);
});

let currentRank = 1;
let previousTotalValue = sortedCountries[0]?.totalValue;
sortedCountries.forEach((country, index) => {
  if (country.totalValue === previousTotalValue) {
    country.rank = currentRank;
  } else {
    currentRank = index + 1;
    country.rank = currentRank;
    previousTotalValue = country.totalValue;
  }
});

export default async function Home() {
  return (
    <div className="p-12">
      <div className="p-10">
        <MenuBar />
      </div>
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          The Correct Olympic Medals Ranking
        </h1>
        <p className="text-lg mb-8 text-center">
          Ranking Countries by Gold undermines the achievements of Silver and
          Bronze Medalists! But ranking total medals just does the opposite.
          Like true consumerists, let&#39;s rank each country by the total value
          of each medal!
        </p>

        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Olympic_Rings.svg/1600px-Olympic_Rings.svg.png?20111003031241"
            alt=""
            style={{ width: "25%", height: "auto" }}
          />
        </div>
      </div>
      <div className="p-10 bg-slate-100	">
        <Table className="pt-10 ">
          <TableCaption>
            Thanks for Visiting! Contact me @sanjayamirthraj
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Country</TableHead>
              <TableHead>Flag</TableHead>
              <TableHead>Gold</TableHead>
              <TableHead>Silver</TableHead>
              <TableHead>Bronze</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Original Rank</TableHead>
              <TableHead className="text-right">Value Rank</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {await Promise.all(
              sortedCountries.map(async (country) => {
                return (
                  <TableRow key={country.country.iso_alpha_3}>
                    <TableCell className="font-medium">
                      {country.country.iso_alpha_3}
                    </TableCell>
                    <TableCell>
                      <img
                        src={`https://flagsapi.com/${country.country.iso_alpha_2}/flat/32`}
                        alt={country.country.iso_alpha_3 || "flag"}
                      />
                    </TableCell>
                    <TableCell>{country.gold}</TableCell>
                    <TableCell>{country.silver}</TableCell>
                    <TableCell>{country.bronze}</TableCell>
                    <TableCell>
                      {"$" +
                        country.totalValue.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                    </TableCell>
                    <TableCell>{country.originalRank}</TableCell>
                    <TableCell className="text-right">{country.rank}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
