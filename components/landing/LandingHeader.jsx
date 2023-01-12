import { Button } from "@/components/landing/Button";
import { Container } from "@/components/landing/Container";
import { DiamondIcon } from "@/components/landing/DiamondIcon";

export function LandingHeader() {
  return (
    <div className="relative z-20 pb-11 lg:pt-11">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="bg-black  text-happy-yellow order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm  sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-2">
          <div className="mx-auto flex items-center gap-4 px-4">
            <p>
              <time dateTime="2022-04-04">Febrero</time>{" "}
              <time dateTime="2022-04-06">24-26, 2023</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Mexico City, MX</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
