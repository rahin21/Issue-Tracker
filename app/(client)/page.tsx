import { BarChrt } from "@/components/dashboard/BarChrt";
import LatestIssues from "@/components/dashboard/LatestIssues";

export default function Home() {
  return (
    <div>
      <div className="lg:grid lg:grid-cols-2 lg:space-x-10 mt-10">
        <BarChrt />
        <LatestIssues />
        
      </div>
    </div>
  );
}
