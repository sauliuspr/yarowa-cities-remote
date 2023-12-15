import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import StatusIndicator from "./StatusIndicator"

function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

function FormatDeploymentDate(d) {
  let YYYY, MM, DD, hour, min, sec
  if (d) {
      // 2nd formatt: "07/30/2021 18:57:55"
      //               01234567890123456789
      if (d.substr(2, 1) === "/") {
          YYYY = d.substr(6, 4)
          MM = d.substr(0, 2)
          DD = d.substr(3, 2)
          hour = d.substr(11, 2)
          min = d.substr(14, 2)
          sec = d.substr(17, 2)
      } else {
          //"deployedAt": "2021-06-25T15:49:12Z"
          //               01234567890123456789
          YYYY = d.substr(0, 4)
          MM = d.substr(5, 2)
          DD = d.substr(8, 2)
          hour = d.substr(11, 2)
          min = d.substr(14, 2)
          sec = d.substr(17, 2)
      }
      //month starts with 0
      var dd = new Date(Date.UTC(YYYY, MM - 1, DD, hour, min, sec, 0));

      let ye = new Intl.DateTimeFormat('ch', { year: 'numeric' }).format(dd);
      let mo = new Intl.DateTimeFormat('ch', { month: 'short' }).format(dd);
      let da = new Intl.DateTimeFormat('ch', { day: '2-digit' }).format(dd);
      let hh = padWithLeadingZeros(new Intl.DateTimeFormat('ch', { hour12: false, hour: 'numeric' }).format(dd), 2);
      let mm = padWithLeadingZeros(new Intl.DateTimeFormat('ch', { hour12: false, minute: 'numeric' }).format(dd), 2);

      return `- ${da}.${mo} ${hh}:${mm}`;
  } else {
      return "";
  }
}

const CityCardCompact = ({ city }) => {
  const isHealthy = city.onlineDiagnostics.status === 'healthy';
  const displayKey = isHealthy ? city.key.toUpperCase() : city.key.toLowerCase();
  const displayName = isHealthy ? city.displayName.toUpperCase() : city.displayName.toLowerCase();
  const diagnostics =  city.onlineDiagnostics.regions[0]
  const lastDiagnostics = city.lastDiagnostics?.regions[0] || city.onlineDiagnostics.regions[0]
  const nodeString = "("+ city.displayName + " " + diagnostics.nodeSize + "x" + diagnostics.vmMemory + "GBx" + diagnostics.vmCPU + "vCPU";

  return (
    <Card className="h-full p-1">
      <CardHeader className="flex gap-3">
        <StatusIndicator color={city.onlineDiagnostics.color} />
        <div className="flex flex-col">
          <p className="text-xl">{displayKey} {city.onlineDiagnostics.regions[0].region}</p>
        </div>
      </CardHeader>
      <CardBody className="h-full p-4"> 
        <div className="flex items-center">
          <StatusIndicator color={diagnostics.statusColor} shape="rectangle" />
          <p className="text-md flex-1">{nodeString}</p> 
        </div>
        <div className="flex items-center"> 
          <StatusIndicator status={diagnostics.frontend.status} shape="rectangle" />
          <Link className="text-xs" href="https://github.com/yaseenmustapha">
          &nbsp;FE&nbsp;
          </Link>
          <span className="text-xs">- {lastDiagnostics.frontend.codeVersion} {FormatDeploymentDate(lastDiagnostics.frontend.deployedAt)}</span>
        </div>
        <div className="flex items-center">
          <StatusIndicator status={diagnostics.backend.status} shape="rectangle" />
          <Link className="text-xs" href="https://github.com/yaseenmustapha">
          &nbsp;BE&nbsp;
          </Link>
          <span className="text-xs">- {lastDiagnostics.backend.codeVersion} {FormatDeploymentDate(lastDiagnostics.backend.deployedAt)}</span>
        </div>
      {city.onlineDiagnostics.regions.map((region, regionIndex) => (
        <React.Fragment key={regionIndex}>
            <div className="flex items-center">
              <StatusIndicator status={diagnostics.backend.status} shape="rectangle" />
              <Link className="text-xs" href="https://github.com/yaseenmustapha">
              &nbsp;{region.country}&nbsp;
              </Link>
              <span className="text-xs"> - {(city.lastDiagnostics?.regions[0].backend.config.codeVersion ?? region.backend.config.codeVersion).slice(0, 32)} </span>
              <span className="text-xs">{FormatDeploymentDate(city.lastDiagnostics?.regions[0].backend.config.deployedAt ?? region.backend.config.deployedAt)}</span>
            </div>
        </React.Fragment>
      ))}
      </CardBody>
    </Card>
  );
};

export default CityCardCompact;
