"use client";

import { ArrowRightIcon, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";

const chartConfig = {
  sessions_count: {
    label: "Subjects",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function Component({
  chartdata,
}: {
  chartdata?: {
    browser: string;
    visitors: number;
    fill: string;
  }[];
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center pb-0">
        <CardTitle>Session Breakdown</CardTitle>
        <Link className="text-primary flex" href={"/dashboard/allsessions"}>
          Show All Sessions
          <ArrowRightIcon />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartdata}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
